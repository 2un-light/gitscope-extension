import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { saveLastStagedFiles } from '../utils/fileUtils';
import { IGitService } from '../interfaces/IGitService';
import { IGeminiService } from '../interfaces/IGeminiService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';

export class GenerateCommitMessageCommand implements ICommand {
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

    //QuickPick 생성 - 스테이징된 파일 재사용 여부 묻기
    private prepareReuseConfirmationItems(stagedFiles: string[]): {items: vscode.QuickPickItem[], savedMessageLabel: string} {
        const savedMessageLabel = `✅ 이전에 스테이징 한 ${stagedFiles.length}개 파일로 진행   (${stagedFiles.join(", ")})`;
        const freshSelect = '🔄 새로 파일 선택';
        const cancel = '❌ 취소';

        const items: vscode.QuickPickItem[] = [
            {label: savedMessageLabel},
            {label: freshSelect},
            {label: cancel},
        ];

        return { items, savedMessageLabel };
    }

    //파일 선택 방식 입력(재사용 or 새로 선택)
    //최종 파일 목록 반환, 취소시 undefined 반환
    private async promptForFileSelection(stagedFiles: string[]): Promise<string[] | undefined> {
        let selectedFiles: string[] = []; 
        
        if(stagedFiles && stagedFiles.length > 0) {
            this.ui.output(`ℹ️ 스테이징된 (${stagedFiles.length}개 파일)가 있습니다.`);
            const { items, savedMessageLabel } = this.prepareReuseConfirmationItems(stagedFiles);

            const confirmation = await this.ui.showQuickPick(items, {
                    title: '이전에 스테이징 한 파일로 진행하시겠습니까?',
                    placeHolder: '선택하세요',
                    ignoreFocusOut: true
                }
            );

            if(confirmation?.label === savedMessageLabel) {
                selectedFiles = stagedFiles;
                return selectedFiles;
            }else if(confirmation?.label === '❌ 취소' || confirmation === undefined) {
                this.ui.output('❌ 작업이 취소되었습니다.');
                return undefined;
            }
            
        }

        this.ui.output('🔄 수정된 파일 목록 확인 중...');
        const modifiedFiles = await this.git.getModifiedFiles();

        if (modifiedFiles.length === 0) {
            this.ui.showErrorMessage(ERROR_MESSAGES.noModifiedCode, {});
            return;
        }

        const selected = await this.ui.selectFilesQuickPick(
            modifiedFiles,
            "커밋 메시지를 추천받을 파일을 선택하세요 (복수 선택 가능)"
        )

        if (!selected) {
            this.ui.output('❌ 파일 선택이 취소되었습니다.');
            return undefined;
        }

        selectedFiles = selected;
        await saveLastStagedFiles(this.context, selectedFiles);
        return selectedFiles;
            
    }

    //선택된 파일 스테이징, 해당 파일에 대한 Git Diff 수집
    private async getDiffForGeneration(selectedFiles: string[]): Promise<string> {
        this.ui.output('🔄 선택된 파일을 **스테이징** 중...');
        await this.git.stageSelectedFiles(selectedFiles);
        this.ui.output('✅ 스테이징 완료.');

        //4. 선택된 파일의 diff 수집
        this.ui.output('🔄 Git diff 수집 중...');
        const diff = await this.git.getGitDiff();

        if(!diff.trim()) {
            this.ui.showErrorMessage(ERROR_MESSAGES.emptyDiff, {});
        }

        return diff;
    }


    public async execute(): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🪶 커밋 메시지 추천 시작');


        let diff: string;

        try {

            //1. 스테이징된 파일 목록 불러오기
            const stagedFiles = await this.git.getStagedFiles();
            
            // 2. 파일 선택 및 범위 결정
            const selectedFiles = await this.promptForFileSelection(stagedFiles);
            if(!selectedFiles) {
                return;
            }
            this.ui.output(`✅ **${selectedFiles.length}개 파일** 선택 완료.`);

            //3. 선택된 파일 staging, diff 수집
            const diff = await this.getDiffForGeneration(selectedFiles);

            //4. Gemini에게 commit message 추천 요청
            this.ui.output('🤖 Gemini에게 commit message 추천 받는 중...');
            const message = await this.gemini.generateCommitMessage(diff);

            //5. 추천 메시지 출력 및 클립보드 복사
            this.ui.output('----------------------------');
            this.ui.output('💡 추천 커밋 메시지:');
            this.ui.output(`"${message}"`);

            this.ui.output('----------------------------');
            await vscode.env.clipboard.writeText(message);
            this.ui.output('📋 클립보드에 복사 완료!');
            this.ui.output('🚀 커밋을 실행하려면 명령 팔레트에서 "GitScope: 🚀 [COMMIT] 변경 사항 Commit"를 실행하세요.');

        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.generateCommitMessageFailed, {});
                        
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Recommand Commit Message Error: ${detailedMessage}`);

        }
    }
}