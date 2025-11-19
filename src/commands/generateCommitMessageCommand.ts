import * as vscode from 'vscode';
import { getGitDiff, getModifiedFiles, getStagedFiles, stageSelectedFiles } from '../service/gitService';
import { generateCommitMessage } from '../service/geminiService';
import { selectFiles } from '../core/fileSelection';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { saveLastStagedFiles } from '../core/fileScopeManager';

export async function generateCommitMessageCommand(context: vscode.ExtensionContext) {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);
    output.appendLine('🪶 커밋 메시지 추천 시작');

    let selectedFiles: string[] = []; 
    let diff: string;

    try {

        //1. 스테이징된 파일 목록 불러오기
        const stagedFiles = await getStagedFiles();
        let useSavedScope = false;

        if(stagedFiles && stagedFiles.length > 0) {
            
            const savedMessage = `✅ 이전에 스테이징 한 ${stagedFiles.length}개 파일로 진행   (${stagedFiles.join(", ")})`;
            const freshSelect = '🔄 새로 파일 선택';
            const cancel = '❌ 취소';

            output.appendLine(`ℹ️ 스테이징된 (${stagedFiles.length}개 파일)가 있습니다.`);

            const confirmation = await vscode.window.showQuickPick(
                [savedMessage, freshSelect, cancel],
                {
                    title: '이전에 스테이징 한 파일로 진행하시겠습니까?',
                    placeHolder: '선택하세요',
                    ignoreFocusOut: true
                }
            );

            if(confirmation === savedMessage) {
                selectedFiles = stagedFiles;
                useSavedScope = true;
            }else if(confirmation === cancel || confirmation === undefined) {
                output.appendLine('❌ 작업이 취소되었습니다.');
                return;
            }
            
        }
        
        // 2. 저장된 범위를 사용하지 않는 경우, 새로 파일 선택
        if(!useSavedScope){
            output.appendLine('🔄 수정된 파일 목록 확인 중...');
            const modifiedFiles = await getModifiedFiles();

            if (modifiedFiles.length === 0) {
                output.appendLine('⚠️ 변경된 코드가 없습니다.');
                return;
            }

            const selected = await selectFiles(
                modifiedFiles,
                "커밋 메시지를 추천받을 파일을 선택하세요 (복수 선택 가능)"
            )

            if (!selected) {
                output.appendLine('❌ 파일 선택이 취소되었습니다.');
                return;
            }

            selectedFiles = selected;
            await saveLastStagedFiles(context, selectedFiles);
        }

        output.appendLine(`✅ **${selectedFiles.length}개 파일** 선택 완료.`);

        //3. 선택된 파일 staging
        output.appendLine('🔄 선택된 파일을 **스테이징** 중...');
        await stageSelectedFiles(selectedFiles);
        output.appendLine('✅ 스테이징 완료.');

        //4. 선택된 파일의 diff 수집
        output.appendLine('🔄 Git diff 수집 중...');
        diff = await getGitDiff();

        if(!diff.trim()) {
            output.appendLine('⚠️ 선택된 파일에서 유효한 변경 사항을 찾을 수 없습니다.');
            return;
        }

        //5. Gemini에게 commit message 추천 요청
        output.appendLine('🤖 Gemini에게 commit message 추천 받는 중...');
        const message = await generateCommitMessage(context, diff);

        //6. 추천 메시지 출력 및 클립보드 복사
        output.appendLine('----------------------------');
        output.appendLine('💡 추천 커밋 메시지:');
        output.appendLine(`"${message}"`);

        output.appendLine('----------------------------');
        await vscode.env.clipboard.writeText(message);
        output.appendLine('📋 클립보드에 복사 완료!');
        output.appendLine('🚀 커밋을 실행하려면 명령 팔레트에서 "GitScope: 🚀 [COMMIT] 변경 사항 Commit"를 실행하세요.');

    } catch (error) {

        vscode.window.showErrorMessage(ERROR_MESSAGES.generateCommitMessageFailed);
                    
        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Recommand Commit Message Error: ${detailedMessage}`);

    }
}