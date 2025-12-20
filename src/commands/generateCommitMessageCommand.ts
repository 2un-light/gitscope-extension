import * as vscode from 'vscode';
import { saveLastStagedFiles } from '../utils/fileUtils';
import { IGitService } from '../interfaces/IGitService';
import { IGeminiService } from '../interfaces/IGeminiService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ModifiedFileQuickPickItem } from '../interfaces/IModifiedFileQuickPickItem';
import { GitFileStatus } from '../types/gitTypes';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class GenerateCommitMessageCommand implements ICommand {
    
    constructor(
        private context: vscode.ExtensionContext,
        private git: IGitService,
        private gemini: IGeminiService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    //QuickPick 생성 - 스테이징된 파일 재사용 여부 묻기
    private prepareReuseConfirmationItems(lastStagedFiles: string[], t: ReturnType<II18nProvider['t']>): {items: vscode.QuickPickItem[], savedMessageLabel: string} {
        const savedMessageLabel = t.messages.reuseLabel(lastStagedFiles.length, lastStagedFiles);
        
        const freshSelect = t.messages.reuseFresh;
        const cancel = t.messages.cancelButton;

        const items: vscode.QuickPickItem[] = [
            {label: savedMessageLabel},
            {label: freshSelect},
            {label: cancel},
        ];

        return { items, savedMessageLabel };
    }

    //파일 선택 방식 입력(재사용 or 새로 선택)
    //최종 파일 목록 반환, 취소시 undefined 반환
    private async promptForFileSelection(lastStagedFiles: GitFileStatus[], t: ReturnType<II18nProvider['t']>): Promise<boolean> {

        const selectedFilesPaths = lastStagedFiles.map(f => f.path);
        
        if(selectedFilesPaths && selectedFilesPaths.length > 0) {
            this.ui.output(t.messages.stagedFilesInfo(selectedFilesPaths.length));
            const { items, savedMessageLabel } = this.prepareReuseConfirmationItems(selectedFilesPaths, t);

            const confirmation = await this.ui.showQuickPick(items, {
                    title: t.messages.reuseConfirmTitle,
                    placeHolder: t.messages.reuseConfirmPlaceholder,
                    ignoreFocusOut: true
                }
            );

            if(confirmation?.label === savedMessageLabel) {
                //스테이징된 파일 저장하기
                await saveLastStagedFiles(this.context, selectedFilesPaths);
                this.ui.output(t.messages.reuseSaved(selectedFilesPaths.length));
                return true;
            }else if(confirmation?.label === t.messages.cancelButton || confirmation === undefined) {
                this.ui.output(t.messages.cancelled);
                return false;
            }
            
        }

        //파일 선택하기
        this.ui.output(t.messages.checkingModifiedFiles);
        await this.git.unstageSelectedFiles(selectedFilesPaths);
        const modifiedFiles = await this.git.getModifiedFiles();

        if (modifiedFiles.length === 0) {
            this.ui.showErrorMessage(t.errors.noModifiedCode, {});
        }

        const modifiedFilesItems: ModifiedFileQuickPickItem[] = modifiedFiles.map(files => ({
            label: files.isDeleted ? `${files.path}`: files.path,
            description: files.isDeleted ? t.messages.deletedFileDescription : '',
            isDeleted: files.isDeleted,
            path: files.path,
        }));

        const selected = await this.ui.selectFilesQuickPick(
            modifiedFilesItems,
            t.messages.selectingFilesTitle
        );

        if (selected === undefined) {
            this.ui.output(t.messages.cancelled);
            return false;
        }

        const selectedNewFilesPaths = selected.map(f => f.path);

        this.ui.output(t.messages.stagingSelectedFiles);
        await this.git.stageSelectedFiles(selectedNewFilesPaths);
        this.ui.output(t.messages.stagingComplete);

        await saveLastStagedFiles(this.context, selectedNewFilesPaths);
                this.ui.output(t.messages.stagingSummary(selectedNewFilesPaths.length));
        return true;
            
    }


    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.generateCommitMsgStart);

        const activePanel = ShowNavigator.activePanel;

        try {

            //1. 스테이징된 파일 목록 불러오기
            const stagedFiles = await this.git.getStagedFiles();
            
            // 2. 파일 선택 및 범위 결정
            const selection = await this.promptForFileSelection(stagedFiles, t);
            if(!selection) {
                return;
            }

            //3. 스테이징된 파일 diff 수집
            const diff = await this.git.getGitDiff();
            const currentBranch = await this.git.getCurrentBranchName();

            //4. Gemini에게 commit message 추천 요청
            this.ui.output(t.messages.requestGemini);
            const message = await this.gemini.generateCommitMessage(diff, currentBranch, t);

            //5. 추천 메시지 출력 및 클립보드 복사
            this.ui.output('----------------------------');
            this.ui.output(t.messages.resultTitle);
            this.ui.output(`"${message}"`);

            this.ui.output('----------------------------');
            await this.ui.writeClipboard(message);
            this.ui.output(t.messages.clipboardCopied);
            this.ui.output(t.messages.nextStepGuide);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'generateMessage'
            });

        } catch (error) {

            this.ui.showErrorMessage(t.errors.generateCommitMessageFailed, {});
                        
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Recommand Commit Message Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'generateMessage',
                error: detailedMessage
            });

        }
    }
}