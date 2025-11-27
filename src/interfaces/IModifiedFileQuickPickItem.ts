import * as vscode from 'vscode';

/**
 * VS Code QuickPick에서 수정되거나 변경된 파일을 나타내는 항목을 위한 인터페이스
 * 기본 QuickPickItem 정보를 확장하여 파일의 실제 경로와 변경 상태를 포함.
 */
export interface ModifiedFileQuickPickItem extends vscode.QuickPickItem {
    /**
     * 파일의 실제 경로
     */
    path: string;

    /**
     * 변경 상태
     */
    isDeleted: boolean;
}