import { ICommand } from "../interfaces/ICommand";
import { IGitService } from "../interfaces/IGitService";
import { IUserInteraction } from "../interfaces/IUserInteraction";
import { ShowNavigator } from "./ShowNavigator";
import { II18nProvider } from "../interfaces/II18nProvider";

export class ExecuteCreateTagAndPush implements ICommand{

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ){}
    

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.tagStart);

        const activePanel = ShowNavigator.activePanel;

        try {
            //1. 현재 브랜치가 main 또는 master인지 확인
            const currentBranch = await this.git.getCurrentBranchName();
            if(currentBranch !== 'main' && currentBranch !== 'master') {
                const confirm = await this.ui.showInformationMessage(
                    t.messages.nonMainBranchConfirm(currentBranch),
                    {modal: true},
                    t.messages.continueButton,
                    t.messages.cancelButton,
                );
                if(confirm !== t.messages.continueButton) {
                   this.ui.output(t.messages.cancelled);
                    return; 
                }
            }

            this.ui.output(t.messages.currentBranch(currentBranch));


            //2. 태그 이름 입력 요청
            const tagName = await this.ui.showInputBox({
                title: t.messages.tagNameTitle,
                placeHolder: t.messages.tagNamePlaceholder,
                prompt: t.messages.tagNamePrompt,
                ignoreFocusOut: true,
                validateInput: (value) => value.trim() ? null : t.messages.tagNameRequired,
            });

            if(!tagName) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            //3. 태그 메시지 입력 요청 (선택 사항)
            const tagMessage = await this.ui.showInputBox({
                title: t.messages.tagMessageTitle(tagName),
                placeHolder: t.messages.tagMessagePlaceholder,
                prompt: t.messages.tagMessagePrompt,
                ignoreFocusOut: true,
            });

            // 4. 태그 생성 실행
            this.ui.output(t.messages.createLocalTag(tagName));
            await this.git.createTag(tagName, tagMessage);
            this.ui.output(t.messages.createLocalTagSuccess(tagName));

            // 5. 태그 Push 실행
            this.ui.output(t.messages.pushTag(tagName));
            await this.git.pushTags(tagName);
            this.ui.output(t.messages.pushTagSuccess(tagName));

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'createTagAndPush'
            });

        } catch (error) {
            this.ui.showErrorMessage(t.errors.tagCommandFailed, {});

            // 사용자에게 오류 메시지 출력
            const detailedMessage = error instanceof Error ? error.message : String(error);
            this.ui.output(`⚠️ Tag Command Error: ${detailedMessage}`);

            
            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'createTagAndPush',
                error: detailedMessage
            });
        }
    }

}