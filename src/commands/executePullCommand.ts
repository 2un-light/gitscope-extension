import * as vscode from 'vscode';
import { pullChanges } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executePullCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    output.appendLine('🔄 Git Pull 실행 (origin/현재 브랜치)...');

    try {
        const pullResult = await pullChanges('origin', '');

        if(pullResult.summary.changes > 0) {
            output.appendLine(`🎉 Pull 성공! ${pullResult.summary.changes}개의 파일이 업데이트되었습니다.`);
        }else {
            output.appendLine('✅ Pull 성공! 이미 최신 상태입니다.');
        }

    } catch (error) {
        vscode.window.showErrorMessage(ERROR_MESSAGES.pullFailed);

        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Pull Error: ${detailedMessage}`);
    }
}