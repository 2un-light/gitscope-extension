import { ERROR_MESSAGES } from '../errors/errorMessages';
import { ICommand } from '../interfaces/ICommand';
import { IGitService } from '../interfaces/IGitService';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';

export class ExecuteCheckoutBranchCommand implements ICommand {
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(gitService: IGitService, uiService: IUserInteraction) {
        this.git = gitService;
        this.ui = uiService;
    }

    //QuickPickItem 항목 생성
    private prepareQuickPickItems(branches: string[], currentBranch: string): BranchQuickPickItem[] {
        return branches.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: branch === currentBranch ? '현재 브랜치' : undefined,
            branchName: branch,
        })).sort((a, b) => {
            // 현재 브랜치를 목록의 맨 위로 정렬
            if (a.description && !b.description) return -1;
            if (!a.description && b.description) return 1;
            return 0;
        });

    }


    public async execute(): Promise<void> {
        this.ui.clearOutput();
        this.ui.output('🔄 Git 브랜치 전환 시작');

        try {
            this.ui.output('🔄 로컬 브랜치 목록을 가져오는 중...');

            //브랜치 목록 정리
            await this.git.pruneRemoteBranches();
            const branches = await this.git.getLocalBranches();

            const currentBranch = await this.git.getCurrentBranchName();

            if(branches.length === 0) {
                this.ui.showErrorMessage(ERROR_MESSAGES.noLocalBranchToCheckout, {});
                return;
            }

            //quickpick 항목 생성
            const quickPickItems = this.prepareQuickPickItems(branches, currentBranch);            
            
            //사용자에게 브랜치 선택 요청
            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: '전환할 브랜치를 선택하세요',
                placeHolder: '브랜치 이름 검색',
                ignoreFocusOut: true,
            });

            if(!selectedItem) {
                this.ui.output('❌ 브랜치 선택이 취소되었습니다.');
                return;
            }

            const branchToCheckout = selectedItem.branchName;

            //브랜치 전환 실행
            this.ui.output(`🔄 브랜치 ${branchToCheckout}로 전환 중...`);
            await this.git.checkout(branchToCheckout);
            this.ui.output(`✅ 브랜치 전환 성공 '${branchToCheckout}'로 성공적으로 전환되었습니다. `);


        } catch (error) {            
            this.ui.showErrorMessage(ERROR_MESSAGES.checkoutBranchFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Branch Check out Error: ${detailedMessage}`);
        }
    }
}