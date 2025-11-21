import * as vscode from 'vscode';

export interface BranchQuickPickItem extends vscode.QuickPickItem {
    branchName: string;
}