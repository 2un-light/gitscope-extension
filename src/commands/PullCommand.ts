import { ERROR_MESSAGES } from '../errors/errorMessages';
import { IGitService } from '../interfaces/IGitService';
import { ICommand } from '../interfaces/ICommand';
import { IUserInteraction } from '../interfaces/IUserInteraction';

export class ExecutePullCommand implements ICommand {

    private git: IGitService;
    private ui: IUserInteraction;

    constructor(git: IGitService, uiService: IUserInteraction) {
        this.git = git;
        this.ui = uiService;
    }


    public async execute(): Promise<void> {
        this.ui.clearOutput();  
        this.ui.output('🔄 Git Pull 실행 (origin/현재 브랜치)...');

        try {
            const pullResult = await this.git.pullChanges('origin', '');

            if(pullResult.summary.changes > 0) {
                this.ui.output(`🎉 Pull 성공! ${pullResult.summary.changes}개의 파일이 업데이트되었습니다.`);
            }else {
                this.ui.output('✅ Pull 성공! 이미 최신 상태입니다.');
            }

        } catch (error) {
            this.ui.showErrorMessage(ERROR_MESSAGES.pullFailed, {});

            const detailedMessage = error instanceof Error ? error.stack || error.message : String(error);
            this.ui.output(`⚠️ Pull Error: ${detailedMessage}`);
        }
    }
}