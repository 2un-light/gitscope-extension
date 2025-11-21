import * as vscode from 'vscode';
import { IUserInteraction } from '../interfaces/IUserInteraction';

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

    async selectFilesQuickPick(files: string[],title: string): Promise<string[] | undefined> {

        const items = files.map(f => ({
            label: f,
            picked: false,
        }));

        const selected = await vscode.window.showQuickPick(items, {
            title,
            canPickMany: true,
            ignoreFocusOut: true,
        });

        if(!selected || selected.length === 0) return undefined;

        return selected.map(item => item.label);
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