import * as vscode from 'vscode';
import path from 'path';
import * as fs from 'fs';

import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ShowNavigator implements ICommand {
    public static activePanel: vscode.WebviewPanel | undefined;

    constructor(
        private context: vscode.ExtensionContext,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    /**
     * WebView panel 생성, HTML 콘텐츠를 로드하여 메시지 핸들러 설정
     */
    public async execute(): Promise<void> {
        const t = this.i18n.t();

        if (ShowNavigator.activePanel) {
            ShowNavigator.activePanel.reveal(vscode.ViewColumn.One);
            this.ui.output(t.messages.navigatorAlreadyOpen);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'gitFlowNavigator',
            t.messages.navigatorTitle,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(
                        path.join(this.context.extensionPath, 'src', 'webview-ui')
                    ),
                ],
            }
        );

        ShowNavigator.activePanel = panel;

        panel.onDidDispose(() => {
            ShowNavigator.activePanel = undefined;
        }, null, this.context.subscriptions);

        // html 파일 내용 로드 및 설정
        const webviewUiPath = path.join(
            this.context.extensionPath,
            'src',
            'webview-ui'
        );

        const styleUri = panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(webviewUiPath, 'styles.css'))
        );
        const scriptUri = panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(webviewUiPath, 'app.js'))
        );

        const htmlPath = path.join(webviewUiPath, 'index.html');

        let htmlContent = '';
        try {
            htmlContent = fs.readFileSync(htmlPath, 'utf8'); //index.html 파일 동기적으로 읽기

        } catch (error) {
            this.ui.showErrorMessage(t.messages.webviewLoadFailed(htmlPath),{});
            return;
        }

        const translationsJson = JSON.stringify(t);
        const cspSource = panel.webview.cspSource;

        let finalHtml = htmlContent
            .replace('${styleUri}', styleUri.toString())
            .replace('${scriptUri}', scriptUri.toString())
            .replace(
                '</head>',
                `
                <script>
                    // Webview 내부에서 사용할 번역 데이터 전역 변수 설정
                    window.I18N_DATA = ${translationsJson};
                </script>
                <meta http-equiv="Content-Security-Policy" 
                    content="default-src 'none'; 
                            img-src ${cspSource} https:; 
                            style-src ${cspSource} 'unsafe-inline' https://fonts.googleapis.com; 
                            font-src ${cspSource} https://fonts.gstatic.com; 
                            script-src ${cspSource} 'unsafe-inline';"> 
                </head>` 
            )
            .replace('{{INDEX_TITLE}}', t.navigator.ui.indexTitle)
            .replace('{{INDEX_DESCRIPTION}}', t.navigator.ui.indexDescription)
            .replace('{{TAB_COMMON}}', t.navigator.ui.tabCommon)
            .replace('{{TAB_SINGLE}}', t.navigator.ui.tabSingle)
            .replace('{{TAB_GITHUB}}', t.navigator.ui.tabGitHub)
            .replace('{{TAB_GITLAB}}', t.navigator.ui.tabGitLab)
            .replace('{{TAB_GITFLOW}}', t.navigator.ui.tabGitFlow);


        panel.webview.html = finalHtml;

        panel.webview.onDidReceiveMessage(
            async message => {
                const { command: commandId, buttonId } = message;

                if (!commandId) return;

                try {
                    await vscode.commands.executeCommand(commandId, buttonId);
                    this.ui.output(t.messages.commandExecuteSuccess);
                } catch (error) {
                    const errMsg =
                        error instanceof Error ? error.message : String(error);

                    this.ui.showErrorMessage(
                        t.messages.commandExecuteFailed(errMsg),
                        {}
                    );
                }
            },
            undefined,
            this.context.subscriptions
        );
    }
}
