import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';

export class ExecuteCommitCommand implements ICommand{
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(gitService: IGitService, uiService: IUserInteraction) {
        this.git = gitService;
        this.ui = uiService;
    }


    // 클립보드에서 텍스트를 읽고 유효성 검사하기
    private async getInitialMessageFromClipboard(): Promise<string | undefined> {
        this.ui.output('📋 클립보드에서 커밋 메시지를 가져오는 중...');
        const message = await vscode.env.clipboard.readText();

        if(!message || message.trim() === '') {
            this.ui.showErrorMessage(ERROR_MESSAGES.commitMessageNotFound, {});
            this.ui.output('💡 "Git Scope: 🪶 [COMMIT] Commit Message 생성"를 먼저 실행하여 메시지를 복사해 주세요.');
            return undefined;
        }

        return message;
    }

    //사용자에게 커밋 메시지 확인/수정 프롬프트 표시, 최종 메시지 반환
    //취소시 undefined 반환
    private async promptAndGetCommitMessage(initialMessage: string): Promise<string | undefined> {
        const editCommitMessage = '✏️ 메시지 수정 후 커밋';
        const cancel = '❌ 취소';
        const commitProceedLabel = `✅ 커밋 진행: ${initialMessage.substring(0, 50)}...`;

        const quickPickItems: vscode.QuickPickItem[] = [
            {label: commitProceedLabel},
            {label: editCommitMessage},
            {label: cancel},
        ];

        const confirmation = await this.ui.showQuickPick(
            quickPickItems,
            { placeHolder: '이 메시지로 커밋을 진행하시겠습니까? '},
        );

        //2-1. 취소 선택 시
        if(confirmation === undefined || confirmation.label === cancel) {
            this.ui.output('👋 커밋이 취소되었습니다.');
            return;
        }

        let finalMessage = initialMessage;
        
        //2-2. 메시지 수정 선택 시
        if(confirmation.label === editCommitMessage) {
            const input = await this.ui.showInputBox({
                prompt: '최종 커밋 메시지를 입력하세요.',
                value: initialMessage,
                ignoreFocusOut: true
            });

            if(input === undefined || input.trim() === '') {
                this.ui.output('⚠️ 메시지가 비어있습니다.');
                return;
            }

            finalMessage = input.trim();
        }
        
        return finalMessage;
    }



    public async execute(): Promise<void> {
        this.ui.clearOutput();
        try {

            //1. 클립 보드에서 커밋 메시지 가져오기
            const initialMessage = await this.getInitialMessageFromClipboard();
            if(!initialMessage) {
                return;
            }


            //2. 커밋 메시지 확인 및 수정 요청
            const finalMessage = await this.promptAndGetCommitMessage(initialMessage);
            if(!finalMessage) {
                return;
            }

            //3. 커밋 수행
           this.ui.output(`\n🚀 Git 커밋 진행 중: "${finalMessage.substring(0, 50)}..."`);
            await this.git.commitChanges(finalMessage);

           this.ui.output('🎉 커밋 성공!');


        } catch (error) {
            
            this.ui.showErrorMessage(ERROR_MESSAGES.commitFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Git Commit Error: ${detailedMessage}`);

        }
    }

}