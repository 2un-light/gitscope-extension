import * as vscode from 'vscode';
import { GEMINI_KEY_NAME } from '../constants/geminiConstants';

/** 
 * 1. Secret Storage에 Gemini API 키를 저장 (기존 키 덮어쓰기 포함)
 * @param key 사용자로부터 입력받은 새로운 API 키
 * @returns void
*/
export async function storeAPIKey(context: vscode.ExtensionContext, key: string) {
    return await context.secrets.store(GEMINI_KEY_NAME, key);
}


/**
 * 2. Secret Storage에서 저장된 Gemini API 키 가져오기
 * @returns 저장된 API 키 문자열 또는 키가 없을 경우 undefined
 */
export async function getAPIKeyFromStore(context: vscode.ExtensionContext): Promise<string | undefined> {
    return await context.secrets.get(GEMINI_KEY_NAME);
}
