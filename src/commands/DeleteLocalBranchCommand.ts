import { ERROR_MESSAGES } from '../errors/errorMessages';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { IGitService } from '../interfaces/IGitService';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';
import { ShowNavigator } from './ShowNavigator';

export class ExecuteDeleteLocalBranchCommand implements ICommand {
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(gitService: IGitService, uiService: IUserInteraction) {
        this.git = gitService;
        this.ui = uiService;
    }

    //현재 브랜치를 제외한 로컬 브랜치 목록 준비
    private prepareDeleteableBranches(branches: string[], currentBranch: string): BranchQuickPickItem[] {
        const deleteableBranches = branches.filter(b => b !== currentBranch);

        return deleteableBranches.map(branch => ({
            label: `$(close) ${branch}`,
            description: '로컬에서 이 브랜치를 삭제합니다.',
            branchName: branch,
        }));
    }

   public async execute(buttonId?: string): Promise<void> {
    this.ui.clearOutput();
    this.ui.output('로컬 브랜치 삭제 시작');

    const activePanel = ShowNavigator.activePanel;

    try {
            //현재 브랜치 확인
            const currentBranch = await this.git.getCurrentBranchName();
            this.ui.output(`✅ 현재 브랜치: ${currentBranch}`);

            const branches = await this.git.getLocalBranches();

            if(branches.length <= 1) { //main 브랜치만 있거나 다른 브랜치가 없는 경우
                this.ui.showErrorMessage(ERROR_MESSAGES.noLocalBranchToDelete, {});
                return;
            }

            const quickPickItems = this.prepareDeleteableBranches(branches, currentBranch);

            //사용자에게 삭제할 브랜치 선택 요청
            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: '삭제할 로컬 브랜치를 선택하세요',
                placeHolder: '브랜치 이름 검색',
                ignoreFocusOut: true,
            }) as BranchQuickPickItem | undefined;

            if(!selectedItem) {
                this.ui.output('❌ 브랜치 삭제가 취소되었습니다.');
                return;
            }

            const branchDelete = selectedItem.branchName;

            const deleteConfirm = '삭제';
            const confirmResult = await this.ui.showWarningMessage(
                `로컬 브랜치 '${branchDelete}'를 정말로 삭제하시겠습니까?\n (Merge 되지 않은 커밋은 손실될 수 있습니다)`,
                {modal: true},
                deleteConfirm
            );

            if(confirmResult !== deleteConfirm) {
                this.ui.output('❌ 브랜치 삭제가 취소되었습니다.');
                return;
            }

            this.ui.output(`🔄 로컬 브랜치 '${branchDelete}' 삭제 중...`);
            await this.git.deleteLocalBranch(branchDelete);

            this.ui.output(`🎉 로컬 브랜치 '${branchDelete}'가 성공적으로 삭제되었습니다.`);

            activePanel?.webview.postMessage({
                type: 'commandSuccess',
                buttonId: buttonId,
                commandId: 'deleteLocalBranch'
            });

        } catch (error) {

            this.ui.showErrorMessage(ERROR_MESSAGES.deleteBranchFailed, {});
            
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