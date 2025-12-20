import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { IGitService } from '../interfaces/IGitService';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecuteDeleteLocalBranchCommand implements ICommand {
    
    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ){}

    //현재 브랜치를 제외한 로컬 브랜치 목록 준비
    private prepareDeleteableBranches(
        branches: string[], 
        currentBranch: string,
        t: ReturnType<II18nProvider['t']>
    ): BranchQuickPickItem[] {
        const deleteableBranches = branches.filter(b => b !== currentBranch);

        return deleteableBranches.map(branch => ({
            label: `$(close) ${branch}`,
            description: t.messages.quickPickDescription,
            branchName: branch,
        }));
    }

   public async execute(buttonId?: string): Promise<void> {
    const t = this.i18n.t();

    this.ui.clearOutput();
    this.ui.output(t.messages.deleteLocalBranchStart);

    const activePanel = ShowNavigator.activePanel;

    try {
            //현재 브랜치 확인
            const currentBranch = await this.git.getCurrentBranchName();
            this.ui.output(t.messages.currentBranch(currentBranch));

            const branches = await this.git.getLocalBranches();

            if(branches.length <= 1) { //main 브랜치만 있거나 다른 브랜치가 없는 경우
                this.ui.showErrorMessage(t.errors.noLocalBranchToDelete, {});
                return;
            }

            const quickPickItems = this.prepareDeleteableBranches(branches, currentBranch, t);

            //사용자에게 삭제할 브랜치 선택 요청
            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: t.messages.quickPickTitle,
                placeHolder: t.messages.quickPickPlaceholder,
                ignoreFocusOut: true,
            }) as BranchQuickPickItem | undefined;

            if(!selectedItem) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            const branchName = selectedItem.branchName;

            const deleteConfirm = t.messages.deleteButton;
            const confirmResult = await this.ui.showWarningMessage(
                t.messages.deleteConfirmMessage(branchName),
                {modal: true},
                deleteConfirm
            );

            if(confirmResult !== deleteConfirm) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            this.ui.output(t.messages.deletingBranch(branchName));
            await this.git.deleteLocalBranch(branchName);

            this.ui.output(t.messages.deleteSuccess(branchName));

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'deleteLocalBranch'
            });

        } catch (error) {

            this.ui.showErrorMessage(t.errors.deleteBranchFailed, {});
            
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Branch Delete Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'deleteLocalBranch',
                error: detailedMessage
            });
            
        }
   }
}