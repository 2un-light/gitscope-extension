import * as vscode from 'vscode';
import { getAPIKeyFromStore, storeAPIKey } from '../utils/keyUtils.js';

export async function configGeminiAPICommand(context: vscode.ExtensionContext) {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    let apiKey = await getAPIKeyFromStore(context);

    if(apiKey) {
        output.appendLine('✅ 저장된 API 키를 사용합니다.');
        output.appendLine('만약 새로 설정하고 싶다면, 명령 팔레트에서 해당 명령을 다시 실행해 주세요.');
    }

    const key = await vscode.window.showInputBox({
        prompt: 'Enter your Gemini API Key (Required)',
        ignoreFocusOut: true,
        password: true 
    });

    
    if (!key) {
        output.appendLine('❌ API 키 입력 취소. 종료합니다.');
        return;
    }
    
    //키 저장하기
    await storeAPIKey(context, key);
    output.appendLine('✅ Gemini API 키가 성공적으로 저장되었습니다!');
    
}