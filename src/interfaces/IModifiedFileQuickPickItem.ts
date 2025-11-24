import * as vscode from 'vscode';

export interface ModifiedFileQuickPickItem extends vscode.QuickPickItem {
    path: string;
    isDeleted: boolean;
}