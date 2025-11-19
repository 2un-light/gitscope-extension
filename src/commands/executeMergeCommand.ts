import * as vscode from 'vscode';
import { getCurrentBranchName, getLocalBranches, mergeBranches } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executeMergeCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    try {
        const currentBranch = await getCurrentBranchName();
        output.appendLine(`✅ 현재 브랜치: ${currentBranch}`);
        output.appendLine('🔄 병합할 로컬 브랜치 목록을 가져오는 중...');

        const branches = await getLocalBranches();
        const mergeCandidates = branches.filter(branch => branch !== currentBranch);

        if(mergeCandidates.length === 0) {
            output.appendLine('로컬에 병합할 수 있는 다른 브랜치가 없습니다.');
            return;
        }

        const QuickPickItems: vscode.QuickPickItem[] = mergeCandidates.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: `${currentBranch} 브랜치로 병합`,
        }));

        const selectedItem = await vscode.window.showQuickPick(QuickPickItems, {
            title: `[${currentBranch}] 브랜치로 병합할 브랜치를 선택하세요`,
            placeHolder: '병합할 브랜치 이름 검색',
            ignoreFocusOut: true,
        });

        if(!selectedItem) {
            output.appendLine('❌ 브랜치 선택이 취소되었습니다.');
            return;
        }

        // 선택된 항목에서 브랜치 이름 파싱
        const sourceBranch = selectedItem.label.replace('$(git-branch) ', '');

        // 병합 실행 (git merge <sourceBranch>)
        output.appendLine(`🔄 ${currentBranch} <- ${sourceBranch} 병합 실행 중...`);
        
        // 병합 후 결과 출력
        const mergeResult = await mergeBranches(sourceBranch);

        output.appendLine('--- Merge 결과 ---');
        output.appendLine(mergeResult); // Git 명령의 결과 메시지를 출력

        if (mergeResult.toLowerCase().includes('conflict')) {
            vscode.window.showErrorMessage(ERROR_MESSAGES.mergeConflict);
            output.appendLine('❌ 병합 충돌이 발생했습니다. 충돌 파일을 확인하고 수동으로 해결한 후 커밋해 주세요.');
        } else {
            output.appendLine(`✅ 병합 성공! ${sourceBranch}의 변경 사항이 ${currentBranch}에 통합되었습니다.`);
            output.appendLine('💡 원격 저장소에 반영하려면 "GitScope: 📤 원격 변경 사항 Push"를 실행하세요.');
            vscode.window.showInformationMessage(`✅ 병합 성공! (${currentBranch} <- ${sourceBranch})`);
        }



    } catch (error) {
        
        vscode.window.showErrorMessage(ERROR_MESSAGES.mergeFailed);
                
        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Merge Error: ${detailedMessage}`);

    }
}