import path from 'path';
import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';

export class ExecuteCloneCommand implements ICommand {

    private git: IGitService;
    private ui: IUserInteraction;

    constructor(gitService: IGitService, uiService: IUserInteraction) {
        this.git = gitService;
        this.ui = uiService;
    }


    //Git URL에서 저장소의 기본 폴더 이름 추출하기
    private getDefaultFolderName(remoteUrl: string): string {
        const urlParts = remoteUrl.split('/');
        let defaultFolderName = urlParts[urlParts.length - 1];
        return defaultFolderName.replace(/\.git$/, '').trim();
    }

    //현재 작업 공간의 루트 경로 가져오기, 없으면 사용자 선택
    private async getCloneRootPath(): Promise<string | undefined> {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if(workspaceFolders && workspaceFolders.length > 0) {
            //현재 열린 첫 번째 폴더를 루트로 사용
            return workspaceFolders[0].uri.fsPath;
        }

        this.ui.showErrorMessage(ERROR_MESSAGES.noWorkSpace, {});
    }
    
    //클론 완료 후 폴더를 새창으로 열시 묻는 프롬프트
    private async showOpenFolderPrompt(localPath: string): Promise<void> {
        const openOption = '새 창으로 열기';

        // 1. 모달 메시지 창을 띄우기
        const openFolder = await this.ui.showInformationMessage(
            `🎉 클론이 성공적으로 완료되었습니다.\n클론된 폴더 ${path.basename(localPath)}를 새 창으로 여시겠습니까?`,
            { modal: true },
            openOption
        );

        // 2. 사용자가 '새 창으로 열기'를 선택한 경우
        if (openFolder === openOption) {
            this.ui.output(`📁 새 창으로 폴더 ${path.basename(localPath)} 열기...`);
            const uri = vscode.Uri.file(localPath);

            await vscode.commands.executeCommand('vscode.openFolder', uri, { forceNewWindow: true });
        } else {
            // 3. 사용자가 취소한 경우 (경고 및 안내)
            this.ui.output('❌ 폴더 열기를 취소했습니다. 현재 워크스페이스를 유지합니다.');
            
            const warningMessage = `❗️ 클론된 저장소 ${path.basename(localPath)}를 사용하려면,
            \n현재 VS Code에서 "새로 클론된 폴더" 를 열어주셔야 Git 명령어들이 정상 작동합니다.`;

            await this.ui.showWarningMessage(warningMessage, { modal: true });
            this.ui.output(warningMessage);
        }
    }

    public async execute(): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🔗 Git Clone 실행');
        try {

            //원격 URL 입력
            const remoteUrl = await this.ui.showInputBox({
                prompt: '클론할 원격 저장소의 URL (SSH 또는 HTTPS 주소)을 입력하세요',
                ignoreFocusOut: true,
            });

            if(!remoteUrl || remoteUrl.trim() === '') {
                this.ui.output('❌ 원격 URL 입력이 취소되었습니다.');
                return;
            }

            //클론 루트 경로 결정
            const workspaceRoot = await this.getCloneRootPath();
            if(!workspaceRoot) {
                return;
            }

            //로컬 폴더 이름 결정 (원격 저장소 이름 추출)
            const defaultFolderName = this.getDefaultFolderName(remoteUrl);


            //로컬 폴더 이름 입력
            const localFolderName = await this.ui.showInputBox({
                prompt: `저장소 복제 경로를 입력하세요. (상위 폴더 ${workspaceRoot})`,
                value: defaultFolderName,
                ignoreFocusOut: true,
            });

            if (!localFolderName || localFolderName.trim() === '') {
                this.ui.output('❌ 로컬 폴더 이름 입력이 취소되었습니다.');
                return;
            }

            const localPath = path.join(workspaceRoot, localFolderName.trim());

            //clone 실행
            this.ui.output(`🔄 클론 시작: ${remoteUrl} -> ${localPath}`);
            await this.git.cloneRepository(remoteUrl.trim(), localPath);
            this.ui.output(`🎉 클론 성공! 프로젝트가 ${localPath}에 생성되었습니다.`);

            this.ui.output('🌟꼭 VS Code에서 해당 폴더를 열어 작업을 시작해 주세요.');

            await this.showOpenFolderPrompt(localPath);

        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.cloneRepositoryFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Git Clone Error: ${detailedMessage}`);
            
        }
    }

}