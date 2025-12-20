import path from 'path';
import * as vscode from 'vscode';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecuteCloneCommand implements ICommand {

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ){}


    //Git URL에서 저장소의 기본 폴더 이름 추출하기
    private getDefaultFolderName(remoteUrl: string): string {
        const urlParts = remoteUrl.split('/');
        let defaultFolderName = urlParts[urlParts.length - 1];
        return defaultFolderName.replace(/\.git$/, '').trim();
    }

    //현재 작업 공간의 루트 경로 가져오기, 없으면 사용자 선택
    private async getCloneRootPath(t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if(workspaceFolders && workspaceFolders.length > 0) {
            //현재 열린 첫 번째 폴더를 루트로 사용
            return workspaceFolders[0].uri.fsPath;
        }

        this.ui.showErrorMessage(t.errors.noWorkSpace, {});
    }
    
    //클론 완료 후 폴더를 새창으로 열시 묻는 프롬프트
    private async showOpenFolderPrompt(localPath: string, t: ReturnType<II18nProvider['t']>): Promise<void> {
        const openOption = t.messages.openInNewWindow;

        // 1. 모달 메시지 창을 띄우기
        const openFolder = await this.ui.showInformationMessage(
            t.messages.cloneCompletedAskOpen(path.basename(localPath)),
            { modal: true },
            openOption
        );

        // 2. 사용자가 '새 창으로 열기'를 선택한 경우
        if (openFolder === openOption) {
            this.ui.output(t.messages.openingFolder(path.basename(localPath)));
            const uri = vscode.Uri.file(localPath);

            await vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: true });
        } else {
            // 3. 사용자가 취소한 경우 (경고 및 안내)
            this.ui.output(t.messages.cancelled);
            
            const warningMessage = t.messages.openFolderWarning(path.basename(localPath));

            await this.ui.showWarningMessage(warningMessage, { modal: true });
            this.ui.output(warningMessage);
        }
    }

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.cloneStart);

        const activePanel = ShowNavigator.activePanel;

        try {

            //원격 URL 입력
            const remoteUrl = await this.ui.showInputBox({
                prompt: t.messages.enterRemoteUrl,
                ignoreFocusOut: true,
            });

            if(!remoteUrl || remoteUrl.trim() === '') {
                this.ui.output(t.messages.cancelled);
                return;
            }

            //클론 루트 경로 결정
            const workspaceRoot = await this.getCloneRootPath(t);
            if(!workspaceRoot) {
                return;
            }

            //로컬 폴더 이름 결정 (원격 저장소 이름 추출)
            const defaultFolderName = this.getDefaultFolderName(remoteUrl);


            //로컬 폴더 이름 입력
            const localFolderName = await this.ui.showInputBox({
                prompt: t.messages.enterLocalFolder(workspaceRoot),
                value: defaultFolderName,
                ignoreFocusOut: true,
            });

            if (!localFolderName || localFolderName.trim() === '') {
                this.ui.output(t.messages.cancelled);
                return;
            }

            const localPath = path.join(workspaceRoot, localFolderName.trim());

            //clone 실행
            this.ui.output(t.messages.cloneProgress(remoteUrl, localPath));
            await this.git.cloneRepository(remoteUrl.trim(), localPath);
            this.ui.output(t.messages.cloneSuccess(localPath));

            this.ui.output(t.messages.openFolderRecommendation);

            await this.showOpenFolderPrompt(localPath, t);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'clone'
            });

        } catch (error) {

            this.ui.showErrorMessage(t.errors.cloneRepositoryFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Git Clone Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'clone',
                error: detailedMessage
            });
            
        }
    }

}