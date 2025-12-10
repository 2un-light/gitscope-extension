import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { ShowNavigator } from './ShowNavigator';
import { IConfigService } from '../interfaces/IConfigService';

export class ConfigGeminiAPICommand implements ICommand {
    private ui: IUserInteraction;
    private config: IConfigService;

    constructor(uiService: IUserInteraction, configService: IConfigService) {
        this.ui = uiService;
        this.config = configService;
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🔑 Gemini API Key 설정 시작');

        const activePanel = ShowNavigator.activePanel;

        try {
            const existingKey = await this.config.getSecret();
            const hasExistingKey = !!existingKey;

            if(hasExistingKey) {
                this.ui.output('✅ 저장된 API 키를 사용합니다.');
                this.ui.output('만약 새로 설정하고 싶다면, 해당 명령을 다시 실행해 주세요.');
            }

            const apiKey = await this.ui.showInputBox({
                prompt: 'Enter your Gemini API Key (Required)',
                ignoreFocusOut: true,
                password: true 
            });

            
            if (!apiKey) {
                this.ui.output('❌ API 키 입력 취소. 종료합니다.');
                return;
            }
            
            //키 저장하기
            this.ui.output('🔄 API 키를 저장하는 중...');
            await this.config.storeSecret(apiKey.trim());

           this.ui.output('✅ Gemini API 키가 성공적으로 저장되었습니다!');

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'configKey'
            });

        } catch (error) {
            this.ui.showErrorMessage(ERROR_MESSAGES.missingApiKey, {});
            
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