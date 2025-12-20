import * as vscode from 'vscode';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';
import { ShowNavigator } from './ShowNavigator';
import { II18nProvider } from '../interfaces/II18nProvider';

export class ExecuteMergeCommand implements ICommand {
    
    constructor(
        private git: IGitService,
        private ui: IUserInteraction,
        private i18n: II18nProvider
    ) {}

    // QuickPickItem 항목 생성
    private prepareQuickPickItems(
        allBranches: string[], 
        currentBranch: string,
        t: ReturnType<II18nProvider['t']>
    ): BranchQuickPickItem[] {
        const mergeCandidates = allBranches.filter(branch => branch !== currentBranch);

        return mergeCandidates.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: t.messages.mergeIntoBranch(currentBranch),
            branchName: branch,
        }));
    }

    public async execute(buttonId?: string): Promise<void> {
        const t = this.i18n.t();
        
        this.ui.clearOutput();
        this.ui.output(t.messages.mergeStart);
        
        const activePanel = ShowNavigator.activePanel;
        
        try {
            const currentBranch = await this.git.getCurrentBranchName();
            this.ui.output(t.messages.currentBranch(currentBranch));
            this.ui.output(t.messages.fetchingMergeBranches);

            const branches = await this.git.getLocalBranches();
            const quickPickItems = this.prepareQuickPickItems(branches, currentBranch, t);

            if (quickPickItems.length === 0) {
                this.ui.showErrorMessage(t.errors.noLocalBranchToMerge, {});
                return;
            }

            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: t.messages.selectBranchToMerge(currentBranch),
                placeHolder: t.messages.searchBranchName,
                ignoreFocusOut: true,
            }) as BranchQuickPickItem | undefined;

            if(!selectedItem) {
                this.ui.output(t.messages.cancelled);
                return;
            }

            // 선택된 항목에서 브랜치 이름 파싱
            const sourceBranch = selectedItem.branchName;

            // 병합 실행 (git merge <sourceBranch>)
            this.ui.output(t.messages.mergeInProgress(currentBranch, sourceBranch));
            
            // 병합 후 결과 출력
            const mergeResult = await this.git.mergeBranches(sourceBranch);

            this.ui.output(t.messages.mergeResultTitle);
            this.ui.output(mergeResult); // Git 명령의 결과 메시지를 출력

            if (mergeResult.toLowerCase().includes('conflict')) {
                this.ui.showErrorMessage(t.errors.mergeConflict, {});
                this.ui.output(t.messages.mergeConflictGuide);
            } else {
                this.ui.output(t.messages.mergeSuccess(sourceBranch, currentBranch));
                this.ui.output(t.messages.pushReminder);
                vscode.window.showInformationMessage(t.messages.mergeSuccessNotification(currentBranch, sourceBranch));
            }

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'merge'
            });

        } catch (error) {
            
            this.ui.showErrorMessage(t.errors.mergeFailed, {});
                    
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Merge Error: ${detailedMessage}`);

            activePanel?.webview.postMessage({
                type: 'commandError',
                buttonId: buttonId,
                commandId: 'merge',
                error: detailedMessage
            });
        }
    }

}