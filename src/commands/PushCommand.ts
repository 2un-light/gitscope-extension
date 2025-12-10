import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';

export class ExecutePushCommand implements ICommand {

    private git: IGitService;
    private ui: IUserInteraction;

    constructor(git: IGitService, uiService: IUserInteraction) {
        this.git = git;
        this.ui = uiService;
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🔄 Git Push 실행 (origin/현재 브랜치)...');

        const activePanel = ShowNavigator.activePanel;

        try {
            const currentBranch = await this.git.getCurrentBranchName(); 
            this.ui.output(`🔎 현재 브랜치: ${currentBranch}`);

            await this.git.pushChanges('origin', currentBranch);
            this.ui.output('🌟 Push 성공! 로컬 커밋이 원격 저장소에 반영되었습니다.');

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'push'
            });

        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.pushFailed, {});
                    
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️Push Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'push',
                error: detailedMessage
            });

        }
    }
}