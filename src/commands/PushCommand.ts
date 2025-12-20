import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecutePushCommand implements ICommand {

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();
        
        this.ui.clearOutput();
        this.ui.output(t.messages.pushStart);

        const activePanel = ShowNavigator.activePanel;

        try {
            const currentBranch = await this.git.getCurrentBranchName(); 
            this.ui.output(t.messages.currentBranch(currentBranch));

            await this.git.pushChanges('origin', currentBranch);
            this.ui.output(t.messages.pushSuccess);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'push'
            });

        } catch (error) {

            this.ui.showErrorMessage(t.errors.pushFailed, {});
                    
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