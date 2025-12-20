import { ICommand } from '../interfaces/ICommand';
import { IGitService } from '../interfaces/IGitService';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecuteCheckoutBranchCommand implements ICommand {

    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    //QuickPickItem 항목 생성
    private prepareQuickPickItems(
        branches: string[], 
        currentBranch: string,
        t : ReturnType<II18nProvider['t']>
    ): BranchQuickPickItem[] {
        return branches.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: branch === currentBranch ? t.messages.currentBranchLabel : undefined,
            branchName: branch,
        })).sort((a, b) => {
            // 현재 브랜치를 목록의 맨 위로 정렬
            if (a.description && !b.description) return -1;
            if (!a.description && b.description) return 1;
            return 0;
        });

    }


    public async execute(buttonId?: string): Promise<void> {
        //실행 시점 번역
        const t = this.i18n.t();

        this.ui.clearOutput();
        this.ui.output(t.messages.branchSwitchStart);

        const activePanel = ShowNavigator.activePanel;

        try {
            this.ui.output(t.messages.fetchingBranches);

            //브랜치 목록 정리
            await this.git.pruneRemoteBranches();
            const branches = await this.git.getLocalBranches();

            const currentBranch = await this.git.getCurrentBranchName();

            if(branches.length === 0) {
                this.ui.showErrorMessage(t.errors.noLocalBranchToCheckout, {});
                return;
            }

            //quickpick 항목 생성
            const quickPickItems = this.prepareQuickPickItems(branches, currentBranch, t);            
            
            //사용자에게 브랜치 선택 요청
            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: t.messages.selectBranchToSwitch,
                placeHolder: t.messages.searchBranchName,
                ignoreFocusOut: true,
            });

            if(!selectedItem) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            const branchToCheckout = selectedItem.branchName;

            //브랜치 전환 실행
            this.ui.output(t.messages.switchingToBranch(branchToCheckout));
            await this.git.checkout(branchToCheckout);
            this.ui.output(t.messages.branchSwitchSuccess(branchToCheckout));

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'checkoutBranch'
            });


        } catch (error) {     
            
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.showErrorMessage(t.errors.checkoutBranchFailed, {});
            this.ui.output(`⚠️ Branch Check out Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'checkoutBranch',
                error: detailedMessage
            });
        }
    }
}