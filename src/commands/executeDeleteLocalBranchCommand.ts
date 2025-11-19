import * as vscode from 'vscode';
import { deleteLocalBranch, getCurrentBranchName, getLocalBranches } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executeDeleteLocalBranchCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    try {
        //현재 브랜치 확인
        const currentBranch = await getCurrentBranchName();
        output.appendLine(`✅ 현재 브랜치: ${currentBranch}`);

        const branches = await getLocalBranches();

        if(branches.length <= 1) { //main 브랜치만 있거나 다른 브랜치가 없는 경우
            output.appendLine('⚠️ 삭제할 수 있는 다른 로컬 브랜치가 없습니다.');
            return;
        }

        const deleteableBranches = branches.filter(b => b !== currentBranch);

        const quickPickItems: vscode.QuickPickItem[] = deleteableBranches.map(branch => ({
            label: `$(close) ${branch}`,
            description: '로컬에서 이 브랜치를 삭제합니다.',
        }));

        //사용자에게 삭제할 브랜치 선택 요청
        const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
            title: '삭제할 로컬 브랜치를 선택하세요',
            placeHolder: '브랜치 이름 검색',
            ignoreFocusOut: true,
        });

        if(!selectedItem) {
            output.appendLine('❌ 브랜치 삭제가 취소되었습니다.');
            return;
        }

        const branchDelete = selectedItem.label.replace('$(close) ', '');

        const deleteConfirm = '삭제';
        const confirmResult = await vscode.window.showWarningMessage(
            `로컬 브랜치 '${branchDelete}'를 정말로 삭제하시겠습니까?\n (Merge 되지 않은 커밋은 손실될 수 있습니다)`,
            {modal: true},
            deleteConfirm
        );

        if(confirmResult !== deleteConfirm) {
            output.appendLine('브랜치 삭제가 취소되었습니다.');
            return;
        }

        output.appendLine(`🔄 로컬 브랜치 '${branchDelete}' 삭제 중...`);
        await deleteLocalBranch(branchDelete);

        output.appendLine(`🎉 로컬 브랜치 '${branchDelete}'가 성공적으로 삭제되었습니다.`);

    } catch (error) {

        vscode.window.showErrorMessage(ERROR_MESSAGES.deleteBranchFailed);
        
        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Branch Delete Error: ${detailedMessage}`);
        
    }
}