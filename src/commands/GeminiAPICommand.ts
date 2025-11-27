import * as vscode from 'vscode';
import { getAPIKeyFromStore, storeAPIKey } from '../utils/keyUtils';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export class ConfigGeminiAPICommand implements ICommand {
    private context: vscode.ExtensionContext;
    private ui: IUserInteraction;

    constructor(context: vscode.ExtensionContext, uiService: IUserInteraction) {
        this.context = context;
        this.ui = uiService;
    }

    public async execute(): Promise<void> {
        this.ui.clearOutput();
        try {
            let apiKey = await getAPIKeyFromStore(this.context);

            if(apiKey) {
                this.ui.output('✅ 저장된 API 키를 사용합니다.');
                this.ui.output('만약 새로 설정하고 싶다면, 해당 명령을 다시 실행해 주세요.');
            }

            const key = await this.ui.showInputBox({
                prompt: 'Enter your Gemini API Key (Required)',
                ignoreFocusOut: true,
                password: true 
            });

            
            if (!key) {
                this.ui.output('❌ API 키 입력 취소. 종료합니다.');
                return;
            }
            
            //키 저장하기
            await storeAPIKey(this.context, key);
           this.ui.output('✅ Gemini API 키가 성공적으로 저장되었습니다!');

        } catch (error) {
            this.ui.showErrorMessage(ERROR_MESSAGES.missingApiKey, {});
            
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ GeminiAPI Key Config Error: ${detailedMessage}`);
        }
    }

}