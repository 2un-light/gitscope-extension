import * as vscode from 'vscode';
import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';
import { BranchQuickPickItem } from '../interfaces/IBranchQuickPickItem';

export class ExecuteMergeCommand implements ICommand {
    private git: IGitService;
    private ui: IUserInteraction;

    constructor(git: IGitService, uiService: IUserInteraction) {
        this.git = git;
        this.ui = uiService;
    }

    //QuickPickItem 항목 생성
    private prepareQuickPickItems(allBranches: string[], currentBranch: string): BranchQuickPickItem[] {
        const mergeCandidates = allBranches.filter(branch => branch !== currentBranch);

        return mergeCandidates.map(branch => ({
            label: `$(git-branch) ${branch}`,
            description: `${currentBranch} 브랜치로 병합`,
            branchName: branch,
        }));
    }

    public async execute(): Promise<void> {
        this.ui.clearOutput();
        try {
            const currentBranch = await this.git.getCurrentBranchName();
            this.ui.output(`✅ 현재 브랜치: ${currentBranch}`);
            this.ui.output('🔄 병합할 로컬 브랜치 목록을 가져오는 중...');

            const branches = await this.git.getLocalBranches();
            const quickPickItems = this.prepareQuickPickItems(branches, currentBranch);

            if (quickPickItems.length === 0) {
                this.ui.showErrorMessage(ERROR_MESSAGES.noLocalBranchToMerge, {});
                return;
            }

            const selectedItem = await this.ui.showQuickPick(quickPickItems, {
                title: `[${currentBranch}] 브랜치로 병합할 브랜치를 선택하세요`,
                placeHolder: '병합할 브랜치 이름 검색',
                ignoreFocusOut: true,
            }) as BranchQuickPickItem | undefined;

            if(!selectedItem) {
                this.ui.output('❌ 브랜치 선택이 취소되었습니다.');
                return;
            }

            // 선택된 항목에서 브랜치 이름 파싱
            const sourceBranch = selectedItem.branchName;

            // 병합 실행 (git merge <sourceBranch>)
            this.ui.output(`🔄 ${currentBranch} <- ${sourceBranch} 병합 실행 중...`);
            
            // 병합 후 결과 출력
            const mergeResult = await this.git.mergeBranches(sourceBranch);

            this.ui.output('--- Merge 결과 ---');
            this.ui.output(mergeResult); // Git 명령의 결과 메시지를 출력

            if (mergeResult.toLowerCase().includes('conflict')) {
                this.ui.showErrorMessage(ERROR_MESSAGES.mergeConflict, {});
                this.ui.output('❌ 병합 충돌이 발생했습니다. 충돌 파일을 확인하고 수동으로 해결한 후 커밋해 주세요.');
            } else {
                this.ui.output(`✅ 병합 성공! ${sourceBranch}의 변경 사항이 ${currentBranch}에 통합되었습니다.`);
                this.ui.output('💡 원격 저장소에 반영하려면 "GitScope: 📤 원격 변경 사항 Push"를 실행하세요.');
                vscode.window.showInformationMessage(`✅ 병합 성공! (${currentBranch} <- ${sourceBranch})`);
            }



        } catch (error) {
            
            this.ui.showErrorMessage(ERROR_MESSAGES.mergeFailed, {});
                    
            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Merge Error: ${detailedMessage}`);

        }
    }

}