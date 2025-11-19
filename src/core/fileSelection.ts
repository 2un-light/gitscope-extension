import * as vscode from 'vscode';

export async function selectFiles(
    files: string[],
    title: string
): Promise<string[] | undefined> {
    
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