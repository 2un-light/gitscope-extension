import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { II18nProvider } from '../interfaces/II18nProvider';
import { ShowNavigator } from './ShowNavigator';

export class ExecuteStageAllCommand implements ICommand {
    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();

        this.ui.clearOutput();
        const activePanel = ShowNavigator.activePanel;

        try {
            this.ui.output(t.messages.stageAllStart);
            this.ui.output(t.messages.stageAllInProgress);

            await this.git.stageAllChanges();

            this.ui.output(t.messages.stageAllSuccess);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId,
                commandId: 'stageAll',
            });
        } catch (error) {
            const detailedMessage =
                error instanceof Error ? error.stack || error.message : String(error);

            this.ui.showErrorMessage(t.errors.stageAllFailed, {});
            this.ui.output(`⚠️ Stage All Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId,
                commandId: 'stageAll',
                error: detailedMessage,
            });
        }
    }
}
