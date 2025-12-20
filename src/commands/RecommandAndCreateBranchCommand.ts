import * as vscode from 'vscode';
import { clearLastStagedFiles, getLastStagedFiles, saveLastStagedFiles } from '../utils/fileUtils';
import { IGitService } from '../interfaces/IGitService';
import { IGeminiService } from '../interfaces/IGeminiService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ModifiedFileQuickPickItem } from '../interfaces/IModifiedFileQuickPickItem';
import { GitFileStatus } from '../types/gitTypes';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

const MODE_MANUAL = 'manualMode';
const MODE_GEMINI = 'geminiMode';

export class ExecuteRecommandAndCreateBranchCommand implements ICommand {

    constructor(
        private context: vscode.ExtensionContext,
        private git: IGitService,
        private gemini: IGeminiService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}
    
    // 이전 스테이징 파일 언스테징하고 정리
    private async cleanUpPreviousStaging(t: ReturnType<II18nProvider['t']>): Promise<void> {
        const lastFiles = await getLastStagedFiles(this.context);

        if(lastFiles.length > 0) {
            this.ui.output(t.messages.cleanupPreviousStaging);
            try {
                await this.git.unstageSelectedFiles(lastFiles);
                await clearLastStagedFiles(this.context);
                this.ui.output(t.messages.cleanupComplete);
            } catch (error) {
                this.ui.output(t.messages.cleanupError(String(error)));
            }
        }
    }

    // 사용자로부터 브랜치 생성 방식 입력받기 (MODE_MANUAL | MODE_GEMINI)
    private async promptBranchCreationMethod(t: ReturnType<II18nProvider['t']>): Promise<typeof MODE_MANUAL | typeof MODE_GEMINI | undefined> {
        const manualOption = t.messages.manualBranchInput;
        const geminiRecommandOption = t.messages.geminiBranchRecommend;

        const quickPickItems: vscode.QuickPickItem[] = [
            {label: manualOption},
            {label: geminiRecommandOption},
        ];

        const selection = await this.ui.showQuickPick(
            quickPickItems,
            { placeHolder: t.messages.selectBranchCreationMethod }
        );

        if(!selection) return undefined;
        return selection.label === manualOption ? MODE_MANUAL : MODE_GEMINI;
    }

    // 브랜치 이름 수동으로 입력받기
    private async inputBranchName(t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        return await this.ui.showInputBox({
            prompt: t.messages.inputNewBranchName,
            ignoreFocusOut: true
        });
    }

    // 수동 입력 핸들링, 브랜치 이름 반환
    private handleManualMode(t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        return this.inputBranchName(t);
    }

    // 브랜치명을 추천받을 파일 선택
    private async selectFilesForBranchName(t: ReturnType<II18nProvider['t']>): Promise<string[] | undefined> {
        this.ui.output(t.messages.checkingModifiedFiles);

        const modifiedFiles: GitFileStatus[] = await this.git.getModifiedFiles();

        if (modifiedFiles.length === 0) {
            this.ui.showErrorMessage(t.errors.noModifiedCode, {});
            return;
        }

        const modifiedFilesItems: ModifiedFileQuickPickItem[] = modifiedFiles.map(files => ({
            label: files.isDeleted ? `${files.path}`: files.path,
            description: files.isDeleted ? t.messages.deletedFileDescription : '',
            isDeleted: files.isDeleted,
            path: files.path,
        }));

        const selected = await this.ui.selectFilesQuickPick(
            modifiedFilesItems,
            t.messages.selectFilesForBranchName
        );

        if (selected === undefined) {
            this.ui.output(t.messages.cancelled);
            return undefined;
        }

        const selectedFiles = selected.map(f => f.path);

        return selectedFiles;
    }

    // Gemini 로부터 브랜치명 추천받기
    private async getRecommandedBranchNames(selectedFiles: string[], t: ReturnType<II18nProvider['t']>): Promise<string[] | undefined> {
        this.ui.output(t.messages.filesSelectedCount(selectedFiles.length));
        
        this.ui.output(t.messages.stagingSelectedFiles);
        await this.git.stageSelectedFiles(selectedFiles);
        this.ui.output(t.messages.stagingComplete);

        this.ui.output(t.messages.savingWorkScope);
        await saveLastStagedFiles(this.context, selectedFiles);
        this.ui.output(t.messages.saveComplete);

        this.ui.output(t.messages.collectingGitDiff);
        const diff = await this.git.getGitDiff();

        if(!diff.trim()) {
            this.ui.showErrorMessage(t.errors.emptyDiff, {});
            return;
        }
        
        // 브랜치명 추천받기
        this.ui.output(t.messages.geminiThinkingBranchName);
        const recommandedNames = await this.gemini.generateBranchNames(diff, 3, t);

        return recommandedNames;
    }

    // Gemini 추천 모드 핸들링
    private async handleGeminiMode(t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        let selectedFiles: string[] = [];
        let branchName: string | undefined;

        try {
            selectedFiles = await this.selectFilesForBranchName(t) ?? [];
            if(selectedFiles.length === 0) return undefined;

            const recommandedNames = await this.getRecommandedBranchNames(selectedFiles, t);

            if(!recommandedNames || recommandedNames.length === 0) {
                this.ui.showErrorMessage(t.errors.geminiBranchRecommandationFailed, {});
                branchName = await this.inputBranchName(t);
            } else {
                branchName = await this.selectRecommandBranchName(recommandedNames, t);
            }

            return branchName;

        } catch (error) {
            this.ui.output(t.messages.geminiModeError(error instanceof Error ? error.message : String(error)));
            this.ui.showErrorMessage(t.errors.recommendationFailed, {});
            return undefined;
        }
    }

    // 추천 이름 목록 제시, 선택받기
    private async selectRecommandBranchName(recommandedNames: string[], t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        const quickPickItems: vscode.QuickPickItem[] = recommandedNames.map(name => ({
            label: t.messages.recommendedBranchLabel(name),
            description: name
        }));

        const recommandedSelection = await this.ui.showQuickPick(
            quickPickItems,
            {
                placeHolder: t.messages.selectRecommendedBranch
            }
        );

        if(!recommandedSelection) {
            this.ui.output(t.messages.cancelled);
            return undefined;
        }

        return recommandedSelection.description;
    }

    // 브랜치 생성
    private async createBranch(branchName: string, t: ReturnType<II18nProvider['t']>): Promise<void> {
        this.ui.output(t.messages.creatingBranch(branchName));
        await this.git.createBranch(branchName);
        this.ui.output(t.messages.branchCreated(branchName));
    }

    // 사용자에게 브랜치 전환 여부 묻고 전환
    private async promptAndCheckout(branchName: string, t: ReturnType<II18nProvider['t']>): Promise<void> {
        const switchOption = t.messages.switchBranchButton;
        const confirmation = await this.ui.showInformationMessage(
            t.messages.switchToNewBranchConfirm(branchName),
            {modal: true},
            switchOption,
        );

        if(confirmation === switchOption) {
            this.ui.output(t.messages.switchingToBranch(branchName));
            await this.git.checkout(branchName);
            this.ui.output(t.messages.branchSwitchComplete(branchName));
        } else {
            this.ui.output(t.messages.switchCancelled);
        }
    }

    // 실행 함수
    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();
        
        this.ui.clearOutput();
        this.ui.output(t.messages.branchRecommendStart);

        const activePanel = ShowNavigator.activePanel;
    
        let branchName: string | undefined;

        try {
            
            // 이전 스테이징 정리
            await this.cleanUpPreviousStaging(t);

            // 모드 선택
            const mode = await this.promptBranchCreationMethod(t);
            if (!mode) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            // 모드별 브랜치 이름 입력받기
            if(mode === MODE_MANUAL) {
                branchName = await this.handleManualMode(t);
            } else {
                branchName = await this.handleGeminiMode(t);
            }

            if(!branchName) {
                this.ui.output(t.messages.invalidBranchNameExit);
                return;
            }

            // 브랜치 생성 및 전환
            await this.createBranch(branchName, t);
            await this.promptAndCheckout(branchName, t);
            
            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'createBranch'
            });

        } catch (error) {
            this.ui.showErrorMessage(t.errors.createBranchFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Create Branch Error: ${detailedMessage}`);

            branchName = await this.inputBranchName(t);
            if (!branchName) return;

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'createBranch',
                error: detailedMessage
            });
        }
    }
}