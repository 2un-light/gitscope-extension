import * as vscode from 'vscode';
import { pushChanges } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executePushCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    output.appendLine('🔄 Git Push 실행 (origin/현재 브랜치)...');

    try {
        await pushChanges('origin', '');
        output.appendLine('🌟 Push 성공! 로컬 커밋이 원격 저장소에 반영되었습니다.');
    } catch (error) {

        vscode.window.showErrorMessage(ERROR_MESSAGES.pushFailed);
                
        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️Push Error: ${detailedMessage}`);

    }
}