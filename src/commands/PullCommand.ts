import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecutePullCommand implements ICommand {

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();
        
        this.ui.clearOutput();  
        this.ui.output(t.messages.pullStart);
        
        const activePanel = ShowNavigator.activePanel;

        try {
            const currentBranch = await this.git.getCurrentBranchName();
            this.ui.output(t.messages.currentBranch(currentBranch));

            const pullResult = await this.git.pullChanges('origin', currentBranch);

            if(pullResult.summary.changes > 0) {
                this.ui.output(t.messages.pullSuccessWithChanges(pullResult.summary.changes));
            } else {
                this.ui.output(t.messages.pullSuccessUpToDate);
            }

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'pull'
            });

        } catch (error) {
            this.ui.showErrorMessage(t.errors.pullFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Pull Error: ${detailedMessage}`);
            
            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'pull',
                error: detailedMessage
            });
        }
    }
}