import * as vscode from 'vscode';
import { commitChanges } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executeCommitCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    try {

        //1. 클립 보드에서 커밋 메시지 가져오기
        output.appendLine('📋 클립보드에서 커밋 메시지를 가져오는 중...');
        const message = await vscode.env.clipboard.readText();

        if(!message || message.trim() === '') {
            output.appendLine('⚠️ 클립보드가 비어 있거나 커밋 메시지가 없습니다.');
            output.appendLine('💡 "Git Scope: 🪶 [COMMIT] Commit Message 생성"를 먼저 실행하여 메시지를 복사해 주세요.');
            return;
        }

        //2. 커밋 메시지 확인 및 수정 요청
        const editCommitMessage = '✏️ 메시지 수정 후 커밋';
        const cancel = '❌ 취소';
        const confirmation = await vscode.window.showQuickPick(
            [`✅ 커밋 진행: ${message.substring(0, 50)}...`, editCommitMessage, cancel],
            { placeHolder: '이 메시지로 커밋을 진행하시겠습니까? '}
        );

        //2-1. 취소 선택 시
        if(confirmation === cancel || confirmation === undefined) {
            output.appendLine('👋 커밋이 취소되었습니다.');
            return;
        }

        let finalMessage = message;
        
        //2-2. 메시지 수정 선택 시
        if(confirmation === editCommitMessage) {
            const input = await vscode.window.showInputBox({
                prompt: '최종 커밋 메시지를 입력하세요.',
                value: message,
                ignoreFocusOut: true
            });

            if(input === undefined || input.trim() === '') {
                output.appendLine('⚠️ 메시지가 비어있습니다.');
                return;
            }

            finalMessage = input.trim();
        }

        //3. 커밋 수행
        output.appendLine(`\n🚀 Git 커밋 진행 중: "${finalMessage.substring(0, 50)}..."`);
        await commitChanges(finalMessage);

        output.appendLine('🎉 커밋 성공!');


    } catch (error) {
        
        vscode.window.showErrorMessage(ERROR_MESSAGES.commitFailed);

        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Git Commit Error: ${detailedMessage}`);

    }
}