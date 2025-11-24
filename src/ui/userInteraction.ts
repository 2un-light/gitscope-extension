import * as vscode from 'vscode';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ModifiedFileQuickPickItem } from '../interfaces/IModifiedFileQuickPickItem';

export class UserInteraction implements IUserInteraction {
    private outputChannel: vscode.OutputChannel;

    constructor(channelName: string) {
        this.outputChannel = vscode.window.createOutputChannel(channelName);
    }

    output(message: string): void {
        this.outputChannel.appendLine(message);
        this.outputChannel.show(true);
    }

    async showQuickPick<T extends vscode.QuickPickItem>(items: T[], options: vscode.QuickPickOptions): Promise<T | undefined> {
        return vscode.window.showQuickPick(items, options);
    }

    async showInputBox(options: vscode.InputBoxOptions): Promise<string | undefined> {
        return vscode.window.showInputBox(options);
    }

    async selectFilesQuickPick(items: ModifiedFileQuickPickItem[] ,title: string): Promise<ModifiedFileQuickPickItem[] | undefined> {

       const selected = await vscode.window.showQuickPick(items, {
            title,
            canPickMany: true,
            ignoreFocusOut: true,
       });

       if(!selected || selected.length === 0) {
        return undefined;
       }

       return selected;
    }

    async showInformationMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined> {
        return vscode.window.showInformationMessage(message, options, ...items);
    }

    async showWarningMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined> {
        return vscode.window.showWarningMessage(message, options, ...items);
    }

    async readClipboard(): Promise<string> {
        return vscode.env.clipboard.readText();
    }

    async writeClipboard(text: string): Promise<void> {
        return vscode.env.clipboard.writeText(text);
    }

    async showErrorMessage(message: string, options: vscode.MessageOptions, ...items: string[]): Promise<string | undefined> {
        return vscode.window.showErrorMessage(message, options, ...items);
    }

    async clearOutput(): Promise<void> {
        return this.outputChannel.clear();
    }

}