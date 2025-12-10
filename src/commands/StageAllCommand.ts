import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';

export class ExecuteStageAllCommand implements ICommand{
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(git: IGitService, uiService: IUserInteraction) {
        this.git = git;
        this.ui = uiService;
    }

    public async execute(buttonId?: string): Promise<void> {
        this.ui.clearOutput();

        const activePanel = ShowNavigator.activePanel;
        try {
            this.ui.output('모든 변경 파일을 스테이징합니다.');
            this.ui.output('🔄 모든 변경 사항 (Untracked 포함) 스테이징 중...');
            await this.git.stageAllChanges();

            this.ui.output('✅ 스테이징 완료.');

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'stageAll'
            });
        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.stageAllFailed, {});
                    
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️Stage All Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'stageAll',
                error: detailedMessage
            });
        }
    }
    
}