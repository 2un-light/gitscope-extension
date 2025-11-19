import * as vscode from 'vscode';
import { checkout, getCurrentBranchName, getLocalBranches, pruneRemoteBranches } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export async function executeCheckoutBranchCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);

    try {
        output.appendLine('🔄 로컬 브랜치 목록을 가져오는 중...');
        //브랜치 목록 정리
        await pruneRemoteBranches();
        const branches = await getLocalBranches();

        const currentBranch = await getCurrentBranchName();

        if(branches.length === 0) {
            output.appendLine('로컬에 전환할 수 있는 브랜치가 없습니다.');
            return;
        }

        //quickpick 항목 생성
        const quickPickItems: vscode.QuickPickItem[] = branches.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: branch === currentBranch ? '현재 브랜치' : undefined,
        })).sort((a, b) => {
            // 현재 브랜치를 목록의 맨 위로 정렬
            if (a.description && !b.description) return -1;
            if (!a.description && b.description) return 1;
            return 0;
        });

        //사용자에게 브랜치 선택 요청
        const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
            title: '전환할 브랜치를 선택하세요',
            placeHolder: '브랜치 이름 검색',
            ignoreFocusOut: true,
        });

        if(!selectedItem) {
            output.appendLine('❌ 브랜치 선택이 취소되었습니다.');
            return;
        }

        const branchToCheckout = selectedItem.label.replace('$(git-branch) ', '');

        //브랜치 전환 실행
        output.appendLine(`🔄 브랜치 ${branchToCheckout}로 전환 중...`);
        await checkout(branchToCheckout);

        output.appendLine(`✅ 브랜치 전환 성공 '${branchToCheckout}'로 성공적으로 전환되었습니다. `);


    } catch (error) {
        
        vscode.window.showErrorMessage(ERROR_MESSAGES.checkoutBranchFailed);

        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Branch Check out Error: ${detailedMessage}`);
    }
}