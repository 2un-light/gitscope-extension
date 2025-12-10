import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { saveLastStagedFiles } from '../utils/fileUtils';
import { IGitService } from '../interfaces/IGitService';
import { IGeminiService } from '../interfaces/IGeminiService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ModifiedFileQuickPickItem } from '../interfaces/IModifiedFileQuickPickItem';
import { GitFileStatus } from '../types/gitTypes';
import { ShowNavigator } from './ShowNavigator';

export class GenerateCommitMessageCommand implements ICommand {
    private context: vscode.ExtensionContext;
    private git: IGitService;
    private gemini: IGeminiService;
    private ui: IUserInteraction;

    constructor(context: vscode.ExtensionContext, git: IGitService, gemini: IGeminiService, uiService: IUserInteraction) {
        this.context = context;
        this.git = git;
        this.gemini = gemini;
        this.ui = uiService;
    }

    //QuickPick 생성 - 스테이징된 파일 재사용 여부 묻기
    private prepareReuseConfirmationItems(lastStagedFiles: string[]): {items: vscode.QuickPickItem[], savedMessageLabel: string} {
        const savedMessageLabel = `✅ 이전에 스테이징 한 ${lastStagedFiles.length}개 파일로 진행   (${lastStagedFiles.join(", ")})`;
        const freshSelect = '🔄 새로 파일 선택';
        const cancel = '❌ 취소';

        const items: vscode.QuickPickItem[] = [
            {label: savedMessageLabel},
            {label: freshSelect},
            {label: cancel},
        ];

        return { items, savedMessageLabel };
    }

    //파일 선택 방식 입력(재사용 or 새로 선택)
    //최종 파일 목록 반환, 취소시 undefined 반환
    private async promptForFileSelection(lastStagedFiles: GitFileStatus[]): Promise<boolean> {

        const selectedFilesPaths = lastStagedFiles.map(f => f.path);
        
        if(selectedFilesPaths && selectedFilesPaths.length > 0) {
            this.ui.output(`ℹ️ 스테이징된 (${selectedFilesPaths.length}개 파일)가 있습니다.`);
            const { items, savedMessageLabel } = this.prepareReuseConfirmationItems(selectedFilesPaths);

            const confirmation = await this.ui.showQuickPick(items, {
                    title: '이전에 스테이징 한 파일로 진행하시겠습니까?',
                    placeHolder: '선택하세요',
                    ignoreFocusOut: true
                }
            );

            if(confirmation?.label === savedMessageLabel) {
                //스테이징된 파일 저장하기
                await saveLastStagedFiles(this.context, selectedFilesPaths);
                this.ui.output(`✅ 기존 **${selectedFilesPaths.length}개 파일**로 진행합니다.`);
                return true;
            }else if(confirmation?.label === '❌ 취소' || confirmation === undefined) {
                this.ui.output('❌ 작업이 취소되었습니다.');
                return false;
            }
            
        }

        //파일 선택하기
        this.ui.output('🔄 수정된 파일 목록 확인 중...');
        await this.git.unstageSelectedFiles(selectedFilesPaths);
        const modifiedFiles = await this.git.getModifiedFiles();

        if (modifiedFiles.length === 0) {
            this.ui.showErrorMessage(ERROR_MESSAGES.noModifiedCode, {});
        }

        const modifiedFilesItems: ModifiedFileQuickPickItem[] = modifiedFiles.map(files => ({
            label: files.isDeleted ? `${files.path}`: files.path,
            description: files.isDeleted ? '⚠️ 수정 혹은 삭제됨 • 현재 디렉토리에 없음': '',
            isDeleted: files.isDeleted,
            path: files.path,
        }));

        const selected = await this.ui.selectFilesQuickPick(
            modifiedFilesItems,
            "커밋 메시지를 추천받을 파일을 선택하세요 (복수 선택 가능)"
        );

        if (selected === undefined) {
            this.ui.output('❌ 파일 선택이 취소되었습니다.');
            return false;
        }

        const selectedNewFilesPaths = selected.map(f => f.path);

        this.ui.output('🔄 선택된 파일을 **스테이징** 중...');
        await this.git.stageSelectedFiles(selectedNewFilesPaths);
        this.ui.output('✅ 스테이징 완료.');

        await saveLastStagedFiles(this.context, selectedNewFilesPaths);
        this.ui.output(`✅ **${selectedNewFilesPaths.length}개 파일** 선택 및 스테이징 완료.`);
        return true;
            
    }


    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🪶 커밋 메시지 추천 시작');

        const activePanel = ShowNavigator.activePanel;

        try {

            //1. 스테이징된 파일 목록 불러오기
            const stagedFiles = await this.git.getStagedFiles();
            
            // 2. 파일 선택 및 범위 결정
            const selection = await this.promptForFileSelection(stagedFiles);
            if(!selection) {
                return;
            }

            //3. 스테이징된 파일 diff 수집
            const diff = await this.git.getGitDiff();
            const currentBranch = await this.git.getCurrentBranchName();

            //4. Gemini에게 commit message 추천 요청
            this.ui.output('🤖 Gemini에게 commit message 추천 받는 중...');
            const message = await this.gemini.generateCommitMessage(diff, currentBranch);

            //5. 추천 메시지 출력 및 클립보드 복사
            this.ui.output('----------------------------');
            this.ui.output('💡 추천 커밋 메시지:');
            this.ui.output(`"${message}"`);

            this.ui.output('----------------------------');
            await this.ui.writeClipboard(message);
            this.ui.output('📋 클립보드에 복사 완료!');
            this.ui.output('🚀 커밋을 실행하려면 명령 팔레트에서 "GitScope: 🚀 [COMMIT] 변경 사항 Commit"를 실행하세요.');

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'generateMessage'
            });

        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.generateCommitMessageFailed, {});
                        
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Recommand Commit Message Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'generateMessage',
                error: detailedMessage
            });

        }
    }
}