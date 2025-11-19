import * as vscode from 'vscode';
import { stageAllChanges } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executeStageAllCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    try {
        output.appendLine('모든 변경 파일을 스테이징합니다.');
        output.appendLine('🔄 모든 변경 사항 (Untracked 포함) 스테이징 중...');
        await stageAllChanges();

        output.appendLine('✅ 스테이징 완료.');
    } catch (error) {

        vscode.window.showErrorMessage(ERROR_MESSAGES.stageAllFailed);
                  
        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️Stage All Error: ${detailedMessage}`);
    }
    
}