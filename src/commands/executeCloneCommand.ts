import path from 'path';
import * as vscode from 'vscode';
import { cloneRepository } from '../service/gitService';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import simpleGit, { SimpleGit } from 'simple-git';

/**
 * 클론 완료 후 사용자에게 새 폴더를 열지 여부를 묻는 UI 프롬프트 표시 및 처리
 * @param localPath 클론된 저장소의 로컬 경로
 * @param output OutputChannel 인스턴스
 */
async function showOpenFolderPrompt(localPath: string, output: vscode.OutputChannel): Promise<void> {
    const openOption = '새 창으로 열기';

    // 1. 모달 메시지 창을 띄워 사용자에게 응답을 강제
    const openFolder = await vscode.window.showInformationMessage(
        `🎉 클론이 성공적으로 완료되었습니다.\n클론된 폴더 ${path.basename(localPath)}를 새 창으로 여시겠습니까?`,
        { modal: true },
        openOption
    );

    // 2. 사용자가 '새 창으로 열기'를 선택한 경우
    if (openFolder === openOption) {
        output.appendLine(`📁 새 창으로 폴더 ${path.basename(localPath)} 열기...`);
        const uri = vscode.Uri.file(localPath);
        
        // 새 창으로 폴더를 열기
        await vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: true });
    } else {
        // 3. 사용자가 취소한 경우 (경고 및 안내)
        output.appendLine('ℹ️ 폴더 열기를 취소했습니다. 현재 워크스페이스를 유지합니다.');
        const warningMessage = `❗️ 클론된 저장소 ${path.basename(localPath)}를 사용하려면,
        \n현재 VS Code에서 "새로 클론된 폴더" 를 열어주셔야 Git 명령어들이 정상 작동합니다.`;

        await vscode.window.showWarningMessage(warningMessage, { modal: true });
        output.appendLine(warningMessage);
    }
}


export async function executeCloneCommand() {
    const output = vscode.window.createOutputChannel('GitScope Output Channel');
    output.show(true);
    output.appendLine('⬇️ Git Clone 실행 (원격 저장소 복제)');

    try {
        const remoteUrl = await vscode.window.showInputBox({
            prompt: '클론할 원격 저장소의 URL (SSH 또는 HTTPS 주소)을 입력하세요',
            ignoreFocusOut: true,
        });

        if(!remoteUrl || remoteUrl.trim() === '') {
            output.appendLine('❌ 원격 URL 입력이 취소되었습니다.');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if(!workspaceFolders) {
            vscode.window.showErrorMessage(ERROR_MESSAGES.noWorkSpace);
            return;
        }

        //VS Code에서 열린 폴더가 clone 저장 위치
        const workspaceRoot = workspaceFolders[0].uri.fsPath;

        //폴더 이름 자동 추출 (URL 끝의 .git 이전 이름 사용)
        const urlParts = remoteUrl.split('/');
        let defaultFolderName = urlParts[urlParts.length - 1].replace(/\.git$/, '');
        

        //로컬 폴더 이름 입력
        const localFolderName = await vscode.window.showInputBox({
            prompt: `저장소 복제 경로를 입력하세요. (상위 폴더 ${workspaceRoot})`,
            value: defaultFolderName,
            ignoreFocusOut: true,
        });

        if (!localFolderName || localFolderName.trim() === '') {
            output.appendLine('❌ 로컬 폴더 이름 입력이 취소되었습니다.');
            return;
        }

        const localPath = path.join(workspaceRoot, localFolderName.trim());

        //clone 실행
        output.appendLine(`🔄 클론 시작: ${remoteUrl} -> ${localPath}`);
        const git: SimpleGit = simpleGit(workspaceRoot, {binary: 'git'});
        await cloneRepository(remoteUrl.trim(), localPath);

        output.appendLine(`🎉 클론 성공! 프로젝트가 ${localPath}에 생성되었습니다.`);
        output.appendLine('🌟 VS Code에서 해당 폴더를 열어 작업을 시작해 주세요.');

        await showOpenFolderPrompt(localPath, output);


    } catch (error) {

        vscode.window.showErrorMessage(ERROR_MESSAGES.cloneRepositoryFailed);

        const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
        output.appendLine(`⚠️ Git Clone Error: ${detailedMessage}`);
        
    }
}