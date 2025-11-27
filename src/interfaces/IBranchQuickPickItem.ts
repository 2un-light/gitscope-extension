import * as vscode from 'vscode';

/**
 * VS Code QuickPick에서 브랜치를 나타내는 항목을 위한 인터페이스
 * 기본 QuickPickItem 정보를 확장하여 실제 브랜치 이름을 포함.
 */
export interface BranchQuickPickItem extends vscode.QuickPickItem {
    //브랜치 실제 이름
    branchName: string;
}