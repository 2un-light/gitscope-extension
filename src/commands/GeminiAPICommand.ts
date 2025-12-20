import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';
import { IConfigService } from '../interfaces/IConfigService';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ConfigGeminiAPICommand implements ICommand {

    constructor(
        private ui: IUserInteraction,
        private config: IConfigService,
        private i18n: II18nProvider
    ) {}

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.configKeyStart);

        const activePanel = ShowNavigator.activePanel;

        try {
            const existingKey = await this.config.getSecret();
            const hasExistingKey = !!existingKey;

            if(hasExistingKey) {
                this.ui.output(t.messages.useExistingKey);
                this.ui.output(t.messages.reRunGuide);
            }

            const apiKey = await this.ui.showInputBox({
                prompt: t.messages.inputKeyPrompt,
                ignoreFocusOut: true,
                password: true 
            });

            
            if (!apiKey) {
                this.ui.output(t.messages.cancelled);
                return;
            }
            
            //키 저장하기
            this.ui.output(t.messages.savingKey);
            await this.config.storeSecret(apiKey.trim());

           this.ui.output(t.messages.saveKeySuccess);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'configKey'
            });

        } catch (error) {
            this.ui.showErrorMessage(t.errors.missingApiKey, {});
            
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ GeminiAPI Key Config Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'configKey',
                error: detailedMessage
            });
        }
    }

}