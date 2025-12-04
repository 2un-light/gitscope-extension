import * as vscode from 'vscode';
import { ICommand } from "../interfaces/ICommand";
import path from 'path';
import * as fs from 'fs';
import { IUserInteraction } from '../interfaces/IUserInteraction';

export class ShowNavigator implements ICommand {
    private context: vscode.ExtensionContext;
    private ui: IUserInteraction;

    constructor(context: vscode.ExtensionContext, ui: IUserInteraction) {
        this.context = context;
        this.ui = ui;
    }

    /**
     * WebView panel 생성, HTML 콘텐츠를 로드하여 메시지 핸들러 설정
     */
    public async execute(): Promise<void> {
        const panel = vscode.window.createWebviewPanel (
            'gitFlowNavigator',
            'GitScope Navigator',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'webview-ui'))]
            }
        );

        // html 파일 내용 로드 및 설정
        const webviewUiPath = path.join(this.context.extensionPath, 'src', 'webview-ui');

        const styleUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(webviewUiPath, 'styles.css')));
        const scriptUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(webviewUiPath, 'app.js')));

        const htmlPath = path.join(webviewUiPath, 'index.html');

        let htmlContent = '';
        try {
            htmlContent = fs.readFileSync(htmlPath, 'utf8'); //index.html 파일 동기적으로 읽기
        } catch (error) {
            vscode.window.showErrorMessage(`[GitScope] 웹뷰 HTML 파일 로드 실패: ${htmlPath}`);
            return;
        }

        //HTML 내용 내의 플레이스홀더(${styleUri})를 실제 웹뷰 URI로 대체
        let finalHtml = htmlContent.replace('${styleUri}', styleUri.toString());
        //HTML 내용 내의 플레이스홀더(${scriptUri})를 실제 웹뷰 URI로 대체
        finalHtml = finalHtml.replace('${scriptUri}', scriptUri.toString());
        // 최종적으로 URI가 적용된 HTML 콘텐츠를 웹뷰에 할당
        panel.webview.html = finalHtml;
        
        //웹뷰에서 확장 기능으로 메시지(명령) 전송 시 처리
        panel.webview.onDidReceiveMessage(
            message => {
                if (message.command) {
                    vscode.commands.executeCommand(message.command).then(
                        () => {
                            this.ui.output(`[GitScope] 명령어 실행 요청 성공: ${message.command}`);
                        },
                        (error) => {
                            this.ui.showErrorMessage(`[GitScope] 명령어 실행 실패: ${message.command}. 
                                오류: ${error instanceof Error ? error.message : String(error)}`, {});
                        }
                    );
                }
            },
            undefined,
            this.context.subscriptions
        );


    }
}