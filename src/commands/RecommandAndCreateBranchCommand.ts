import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { clearLastStagedFiles, getLastStagedFiles, saveLastStagedFiles } from '../utils/fileUtils';
import { IGitService } from '../interfaces/IGitService';
import { IGeminiService } from '../interfaces/IGeminiService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';

const MODE_MANUAL = 'manualMode';
const MODE_GEMINI = 'geminiMode';

export class ExecuteRecommandAndCreateBranchCommand implements ICommand {
    private context: vscode.ExtensionContext;
    private git: IGitService;
    private gemini: IGeminiService;
    private ui: IUserInteraction;

    constructor(context: vscode.ExtensionContext, git: IGitService, gemini: IGeminiService, uiService: IUserInteraction) {
        this.context = context;
        this.git = git;
        this.gemini = gemini;
        this.ui = uiService;
    }
    

    //이전 스테이징 파일 언스테징하고 정리
    private async cleanUpPreviousStaging(): Promise<void> {
        const lastFiles = await getLastStagedFiles(this.context);

        if(lastFiles.length > 0) {
            this.ui.output('🧹 **정리 작업:** 이전에 선택된 파일 작업 디렉토리로 되돌리는 중...');
            try {
                await this.git.unstageSelectedFiles(lastFiles);
                await clearLastStagedFiles(this.context);
                this.ui.output('✅ 정리 완료');
            } catch (error) {
                this.ui.output(`⚠️ 정리 중 오류 발생: ${error}`);
            }
        }
    }

    //사용자로부터 브랜치 생성 방식 입력받기 (MODE_MANUAL | MODE_GEMINI)
    private async promptBranchCreationMethod(): Promise<typeof MODE_MANUAL | typeof MODE_GEMINI | undefined> {
        const manualOption = '✨ 새로운 브랜치 이름 수동 입력';
        const geminiRecommandOption = '🤖 Gemini AI에게 브랜치 이름 추천받기 (3가지)';

        const quickPickItems: vscode.QuickPickItem[] = [
            {label: manualOption},
            {label: geminiRecommandOption},
        ];

        const selection = await this.ui.showQuickPick(
            quickPickItems,
            { placeHolder: '브랜치 생성 방식을 선택해주세요.' }
        );

        if(!selection) return undefined;
        return selection.label === manualOption ? MODE_MANUAL : MODE_GEMINI;

    }

    //브랜치 이름 수동으로 입력받기
    private async inputBranchName(): Promise<string | undefined> {
        return await this.ui.showInputBox({
            prompt: '새로운 브랜치 이름을 입력하세요 (예: feat/my-new-feature)',
            ignoreFocusOut: true
        });
    }

    //수동 입력 핸들링, 브랜치 이름 반환
    private handleManualMode(): Promise<string | undefined> {
        return this.inputBranchName();
    }

    //브랜치명을 추천받을 파일 선택
    private async selectFilesForBranchName(): Promise<string[] | undefined> {
        this.ui.output("🔥 selectFilesForBranchName 진입!");
        this.ui.output('🔄 수정된 파일 목록 확인 중...');
        const modifiedFiles = await this.git.getModifiedFiles();

        if (modifiedFiles.length === 0) {
            this.ui.showErrorMessage(ERROR_MESSAGES.noModifiedCode, {});
            return;
        }

        const selected = await this.ui.selectFilesQuickPick(
            modifiedFiles,
            "브랜치명을 추천받을 파일을 선택하세요 (복수 선택 가능)"
        );

        if (!selected) {
            this.ui.output('❌ 파일 선택이 취소되었습니다.');
            return undefined;
        }
        return selected;
    }

    //Gemini 로부터 브랜치명 추천받기
    private async getRecommandedBranchNames(selectedFiles: string[]): Promise<string[] | undefined> {
        this.ui.output(`✅ **${selectedFiles.length}개 파일** 선택 완료.`);
        
        this.ui.output('🔄 선택된 파일을 **스테이징** 중...');
        await this.git.stageSelectedFiles(selectedFiles);
        this.ui.output('✅ 스테이징 완료.');

        await saveLastStagedFiles(this.context, selectedFiles);
        this.ui.output('💾 현재 작업 범위 저장');


        this.ui.output('🔄 Git diff 수집 중...');
        const diff = await this.git.getGitDiff();

        if(!diff.trim()) {
            this.ui.showErrorMessage(ERROR_MESSAGES.emptyDiff, {});
            return;
        }
        
        //브랜치명 추천받기
        this.ui.output('🔄 Gemini가 열심히 브랜치명을 생각 중...');
        const recommandedNames = await this.gemini.generateBranchNames(diff, 3);

        return recommandedNames;
    }

    //추천 이름 목록 제시, 선택받기
    private async selectRecommandBranchName(recommandedNames: string[]): Promise<string | undefined> {
        const quickPickItems: vscode.QuickPickItem[] = recommandedNames.map(name => ({
            label: `🤖 추천: ${name}`,
            description: name
        }));

        const recommandedSelection = await this.ui.showQuickPick(
            quickPickItems,
            {
                placeHolder: '추천 브랜치 이름 중 하나를 선택해주세요!'
            }
        );

        if(!recommandedSelection) {
            this.ui.output('❌ 추천 브랜치 선택이 취소되었습니다.');
            return undefined;
        }

        return recommandedSelection.description;

    }

    //Gemini 추천 모드 핸들링
    private async handleGeminiMode(): Promise<string | undefined> {
        let selectedFiles: string[] = [];
        let branchName: string | undefined;

        try {
            selectedFiles = await this.selectFilesForBranchName() ?? [];
            if(selectedFiles.length === 0) return undefined;

            const recommandedNames = await this.getRecommandedBranchNames(selectedFiles);

            if(!recommandedNames || recommandedNames.length === 0) {
                this.ui.showErrorMessage(ERROR_MESSAGES.geminiBranchRecommandationFailed, {});
                branchName = await this.inputBranchName();
            }else {
                branchName = await this.selectRecommandBranchName(recommandedNames);
            }

            return branchName;

        } catch (error) {
            this.ui.output(`⚠️ Gemini 모드 실행 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`);
            this.ui.showErrorMessage(ERROR_MESSAGES.recommendationFailed, {});
            return undefined;
        }

    }

    //브랜치 생성
    private async createBranch(branchName: string): Promise<void> {
        this.ui.output(`🔄 브랜치 생성 중: ${branchName}`);
        await this.git.createBranch(branchName);
        this.ui.output(`✅ 브랜치 **${branchName}** 생성이 완료되었습니다.`);
    }

    //사용자에게 브랜치 전환 여부 묻고 전환
    private async promptAndCheckout(branchName: string): Promise<void> {
        const switchOption = '전환합니다';
        const confirmation = await this.ui.showInformationMessage(
            `새로 생성된 브랜치 ${branchName}로 바로 전환하시겠습니까?`,
            {modal: true},
            switchOption,
        );

        if(confirmation === switchOption) {
            this.ui.output(`🔄 **${branchName}** 브랜치로 전환 중...`);
            await this.git.checkout(branchName);
            this.ui.output(`✅ **${branchName}** 브랜치로 전환이 완료되었습니다.`);
        }else {
            this.ui.output(`ℹ️ 브랜치 전환을 취소했습니다. 현재 브랜치를 유지합니다.`);
        }
            
    }

    //실행 함수
    public async execute(): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🌳 Git 브랜치명 추천 시작');
    
        let branchName: string | undefined;

        try {
            
            //이전 스테이징 정리
            await this.cleanUpPreviousStaging();

            //모드 선택
            const mode = await this.promptBranchCreationMethod();
            if (!mode) {
                this.ui.output('❌ 브랜치 생성 방식 선택이 취소되었습니다. 명령 종료.');
                return;
            }

            //모드별 브랜치 이름 입력받기
            if(mode === MODE_MANUAL) {
                branchName = await this.handleManualMode();
            }else {
                branchName = await this.handleGeminiMode();
            }

            if(!branchName) {
                this.ui.output('❌ 유효한 브랜치 이름을 입력받지 못해, 명령을 종료합니다.');
                return;
            }

            //브랜치 생성 및 전환
            await this.createBranch(branchName);
            await this.promptAndCheckout(branchName);


        } catch (error) {
            this.ui.showErrorMessage(ERROR_MESSAGES.createBranchFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Create Branch Error: ${detailedMessage}`);

            branchName = await this.inputBranchName();
            if (!branchName) return;

        }
    }
}
