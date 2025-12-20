import * as vscode from 'vscode';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecuteCommitCommand implements ICommand{

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ){}


    // 클립보드에서 텍스트를 읽고 유효성 검사하기
    private async getInitialMessageFromClipboard(t : ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        this.ui.output(t.messages.readClipboard);
        const message = await vscode.env.clipboard.readText();

        if(!message || message.trim() === '') {
            this.ui.showErrorMessage(t.errors.commitMessageNotFound, {});
            this.ui.output(t.messages.clipboardGuide);
            return undefined;
        }

        return message;
    }

    //사용자에게 커밋 메시지 확인/수정 프롬프트 표시, 최종 메시지 반환
    //취소시 undefined 반환
    private async promptAndGetCommitMessage(initialMessage: string, t: ReturnType<II18nProvider['t']>): Promise<string | undefined> {
        const editCommitMessage = t.messages.commitEdit;
        const cancel = t.messages.cancelButton;
        const commitProceedLabel = t.messages.commitProceed(initialMessage.substring(0, 50));


        const quickPickItems: vscode.QuickPickItem[] = [
            {label: commitProceedLabel},
            {label: editCommitMessage},
            {label: cancel},
        ];

        const confirmation = await this.ui.showQuickPick(
            quickPickItems,
            { placeHolder: t.messages.commitConfirmPlaceholder},
        );

        //2-1. 취소 선택 시
        if(confirmation === undefined || confirmation.label === cancel) {
            this.ui.output(t.messages.cancelled);
            return;
        }

        let finalMessage = initialMessage;
        
        //2-2. 메시지 수정 선택 시
        if(confirmation.label === editCommitMessage) {
            const input = await this.ui.showInputBox({
                prompt: t.messages.commitEditPrompt,
                value: initialMessage,
                ignoreFocusOut: true
            });

            if(input === undefined || input.trim() === '') {
                this.ui.output(t.messages.emptyCommitMessage);
                return;
            }

            finalMessage = input.trim();
        }
        
        return finalMessage;
    }



    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.commitStart);
        const activePanel = ShowNavigator.activePanel;

        try {

            //1. 클립 보드에서 커밋 메시지 가져오기
            const initialMessage = await this.getInitialMessageFromClipboard(t);
            if(!initialMessage) {
                return;
            }


            //2. 커밋 메시지 확인 및 수정 요청
            const finalMessage = await this.promptAndGetCommitMessage(initialMessage, t);
            if(!finalMessage) {
                return;
            }

            //3. 커밋 수행
           this.ui.output(t.messages.commitInProgress(finalMessage.substring(0, 50)));
            await this.git.commitChanges(finalMessage);

           this.ui.output(t.messages.commitSuccess);

           
            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'commit'
            });


        } catch (error) {
            
            this.ui.showErrorMessage(t.errors.commitFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Git Commit Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'commit',
                error: detailedMessage
            });

        }
    }

}