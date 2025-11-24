import { PullResult, simpleGit, SimpleGit } from "simple-git";
import { IGitService } from "../interfaces/IGitService";
import { GitError } from "../errors/Errors";
import { GitFileStatus } from "../types/gitTypes";


export class GitService implements IGitService {
    private git: SimpleGit;

    constructor(private rootPath: string) {
        this.git = simpleGit(rootPath, {binary: 'git'});
    }

    /**
     * 원격 저장소 클론 (git clone)
     * @param url 클론할 원격 저장소의 주소
     * @param localPath localPath 로컬에서 저장될 폴더 경로
     */
    async cloneRepository(url: string, localPath: string): Promise<void> {
        try {
            await this.git.clone(url, localPath);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 브랜치 생성
     * @param branchName 브랜치 이름
     */
    async createBranch(branchName: string): Promise<void> {
        try {
            await this.git.branch([branchName]);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            if (errorMessage.includes('already exists')) {
                throw new GitError(`❌ 브랜치 생성 실패: '${branchName}' 브랜치가 이미 존재합니다.`);
            }
            throw new GitError(errorMessage);
        }
    }


    /**
     * 브랜치 목록 가져오기
     * @returns string[]
     */
    async getLocalBranches(): Promise<string[]> {
        try {
            const branches = await this.git.branchLocal();
            return branches.all;
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 현재 체크아웃되어있는 브랜치 이름 가져오기
     * @returns string
     */
    async  getCurrentBranchName(): Promise<string> {
        try {
            const branchSummary = await this.git.branchLocal();
            return branchSummary.current;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 브랜치 전환
     * @param branchName 브랜치 이름 
     */
    async  checkout(branchName: string): Promise<void> {
        try {
            await this.git.checkout(branchName);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            
            if (errorMessage.includes('did not match any file')) {
                throw new GitError(`❌ 전환 실패: '${branchName}' 브랜치가 존재하지 않습니다.`);
            }
            if (errorMessage.includes('local changes would be overwritten')) {
                throw new GitError(`⚠️ 전환 실패: Uncommitted 변경 사항이 있어 전환할 수 없습니다. 커밋 또는 Stash 후 다시 시도하세요.`);
            }

            throw new GitError(errorMessage);
        }
    }

   /**
     * Staging되지 않은 파일 목록 가져오기
     * @returns GitFileStatus[]
     */
    async getUnstagedFiles(): Promise<GitFileStatus[]> {
        try {
            const status = await this.git.status();

            return status.files
                .filter(file => file.working_dir !== ' ')
                .map(file => ({
                    path: file.path,
                    isDeleted: file.working_dir === 'D',
                }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }

    
    /**
     * 스테이징된 파일 가져오기
     * @returns GitFileStatus[]
     */
    async getStagedFiles(): Promise<GitFileStatus[]> {
        try {
            const status = await this.git.status();

            return status.files
                .filter(file => file.index !== ' ')
                .map(file => ({
                    path: file.path,
                    isDeleted: file.index === 'D',
                }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 수정한 파일 목록 가져오기
     * @returns GitFileStatus[]
     */
    async getModifiedFiles(): Promise<GitFileStatus[]> {
        try {
            const unstaged = await this.getUnstagedFiles();
            const staged = await this.getStagedFiles();

            const allModifiedMap = new Map<string, GitFileStatus>();

            //staged 파일을 먼저 추가한 후, unstaged파일로 덮어쓰기(가장 최신 상태 반영)
            staged.forEach(file => allModifiedMap.set(file.path, file));
            unstaged.forEach(file => allModifiedMap.set(file.path, file));

            return Array.from(allModifiedMap.values());
           
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }




    /**
     * 선택된 파일 Staging
     * @param files GitFileStatus[]
     */
    async stageSelectedFiles(files: string[]): Promise<void> {
        if(files.length === 0) {
            return;
        }
        try {
            await this.git.add(files);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 선택 파일 unStaging
     * @param files string[]
     */
    async unstageSelectedFiles(files: string[]): Promise<void> {
        if(files.length === 0) {
            return;
        }
        
        try {
            await this.git.reset(['HEAD', '--', ...files])
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * Staging된 변경사항 Diff 수집
     * @returns string
     */
    async getGitDiff() : Promise<string> {
        try {
            const diff = await this.git.diff(['--cached', '--text']);
            return diff;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 모든 변경사항 Staging
     */
    async stageAllChanges(): Promise<void> {
        try {
            await this.git.add('.');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 원격 변경사항 pull
     * @param remote string
     * @param branch string
     * @returns PullResult
     */
    async pullChanges(remote: string = 'origin', branch: string = ''): Promise<PullResult> {
        try {
            
            const pullArgs: string[] = branch ? [remote, branch] : [remote];
            return await this.git.pull(pullArgs);

        }catch (error) {
            if(error instanceof GitError) throw error;

            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';

            if (errorMessage.includes('CONFLICT') || 
                errorMessage.includes('merge failed') || 
                errorMessage.includes('Automatic merge failed')) {

                throw new GitError(`Git Pull 중 **병합 충돌** 발생: 충돌 파일을 수동으로 해결해야 합니다.`);
            }
    
            throw new GitError(errorMessage);
        }
    }


    /**
     * Git Commit
     * @param message string
     */
    async commitChanges(message: string): Promise<void> {
        try {
            //커밋 전, Deleted, Renamed 상태의 파일 스테이징
            await this.git.commit(message);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * 원격 저장소로 Push
     * @param remote string
     * @param branch string
     */
    async pushChanges(remote: string = 'origin', branch: string = ''): Promise<void> {
        try {
            //현재 브랜치 이름 가져오기
            const branchName = branch || await this.git.revparse(['--abbrev-ref', 'HEAD']);
            const pushArgs: string[] = ['push', '--set-upstream', remote, branchName];
            await this.git.raw(pushArgs);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * merge 수행
     * @param sourceBranch string
     * @returns string
     */
    async mergeBranches(sourceBranch: string): Promise<string> {
        try {
            const result = await this.git.raw(['merge', sourceBranch]);
            return result.trim();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }


    /**
     * Branch 삭제
     * @param branchName string
     */
    async deleteLocalBranch(branchName: string): Promise<void> {
        try {
            await this.git.branch(['-d', branchName]);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            
            // 병합되지 않은 커밋이 있을 경우 오류 메시지를 사용자에게 명확히 전달합니다.
            if (errorMessage.includes('not fully merged')) {
                throw new GitError(`❌ 브랜치 삭제 실패: '${branchName}'에는 아직 병합되지 않은 커밋이 있습니다.`);
            }
            
            throw new GitError(errorMessage);
        }
    }


    /**
     * 원격에서 삭제된 브랜치 로컬에서 정리
     */
    async pruneRemoteBranches(): Promise<void> {
        try {
            await this.git.fetch(['--prune']);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
            throw new GitError(errorMessage);
        }
    }
}