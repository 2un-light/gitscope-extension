import { ICommand } from "../interfaces/ICommand";
import { IGitService } from "../interfaces/IGitService";
import { IUserInteraction } from "../interfaces/IUserInteraction";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { ShowNavigator } from "./ShowNavigator";

export class ExecuteCreateTagAndPush implements ICommand{
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(gitService: IGitService, uiService: IUserInteraction) {
        this.git = gitService;
        this.ui = uiService;
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🏷️ Git 태그 생성 및 Push 시작');

        const activePanel = ShowNavigator.activePanel;

        try {
            //1. 현재 브랜치가 main 또는 master인지 확인
            const currentBranch = await this.git.getCurrentBranchName();
            if(currentBranch !== 'main' && currentBranch !== 'master') {
                const confirm = await this.ui.showInformationMessage(
                    `현재 브랜치 '${currentBranch}'에 태그를 생성하려고 합니다. 계속하시겠습니까?`,
                    {modal: true},
                    '계속',
                    '취소',
                );
                if(confirm !== '계속') {
                   this.ui.output('❌ 태그 생성이 취소되었습니다.');
                    return; 
                }
            }

            this.ui.output(`현재 브랜치: ${currentBranch}`);


            //2. 태그 이름 입력 요청
            const tagName = await this.ui.showInputBox({
                title: '태그 이름을 입력하세요',
                placeHolder: '태그 이름',
                prompt: 'SemVer 규격에 맞는 태그 이름을 입력하세요.(예: v1.0.0)',
                ignoreFocusOut: true,
                validateInput: (value) => value.trim() ? null : '태그 이름은 필수입니다.',
            });

            if(!tagName) {
                this.ui.output('❌ 태그 이름 입력이 취소되었습니다.');
                return;
            }

            //3. 태그 메시지 입력 요청 (선택 사항)
            const tagMessage = await this.ui.showInputBox({
                title: `태그 '${tagName}'의 메시지를 입력하세요 (선택사항)`,
                placeHolder: '태그 메시지 (생략 가능) Enter',
                prompt: '태그 메시지는 릴리즈 노트에 활용됩니다.',
                ignoreFocusOut: true,
            });

            // 4. 태그 생성 실행
            this.ui.output(`🏷️ 로컬에 태그 '${tagName}' 생성 중...`);
            await this.git.createTag(tagName, tagMessage);
            this.ui.output(`✅ 로컬 태그 생성 성공: ${tagName}`);

            // 5. 태그 Push 실행
            this.ui.output(`☁️ 원격 저장소에 태그 '${tagName}' 푸시 중...`);
            await this.git.pushTags(tagName);
            this.ui.output(`🎉 원격 태그 Push 성공: 태그 '${tagName}'이(가) 원격에 반영되었습니다.`);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'createTagAndPush'
            });

        } catch (error) {
            this.ui.showErrorMessage(ERROR_MESSAGES.tagCommandFailed, {});

            // 사용자에게 오류 메시지 출력
            const detailedMessage = error instanceof Error ? error.message : String(error);
            this.ui.output(`⚠️ Tag Command Error: ${detailedMessage}`);

            
            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'createTagAndPush',
                error: detailedMessage
            });
        }
    }

}