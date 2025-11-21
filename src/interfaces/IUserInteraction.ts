import * as vscode from 'vscode';

export interface IUserInteraction {
    output(message: string): void;
    showQuickPick<T extends vscode.QuickPickItem>(items: T[], options: vscode.QuickPickOptions): Promise<T | undefined>;
    showInputBox(options: vscode.InputBoxOptions): Promise<string | undefined>;
    selectFilesQuickPick(files: string[], title: string): Promise<string[] | undefined>;
    showInformationMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;
    showWarningMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;
    readClipboard(): Promise<string>;
    writeClipboard(text: string): Promise<void>;
    showErrorMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined>;
    clearOutput(): Promise<void>;
}   