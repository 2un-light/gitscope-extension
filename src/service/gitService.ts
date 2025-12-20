import { PullResult, simpleGit, SimpleGit } from "simple-git";
import { IGitService } from "../interfaces/IGitService";
import { GitError } from "../errors/Errors";
import { GitFileStatus } from "../types/gitTypes";


export class GitService implements IGitService {
    private git: SimpleGit;

    constructor(private rootPath: string) {
        this.git = simpleGit(rootPath, {binary: 'git'});
    }


    async cloneRepository(url: string, localPath: string): Promise<void> {
        try {
            await this.git.clone(url, localPath);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }


    async createBranch(branchName: string): Promise<void> {
        try {
            await this.git.branch([branchName]);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            if (errorMessage.includes('already exists')) {
                throw new GitError(`❌ Branch creation failed: Branch '${branchName}' already exists.`);
            }
            throw new GitError(errorMessage);
        }
    }


    async getLocalBranches(): Promise<string[]> {
        try {
            const branches = await this.git.branchLocal();
            return branches.all;
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



    async  getCurrentBranchName(): Promise<string> {
        try {
            const branchSummary = await this.git.branchLocal();
            return branchSummary.current;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



    async  checkout(branchName: string): Promise<void> {
        try {
            await this.git.checkout(branchName);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            
            if (errorMessage.includes('did not match any file')) {
                throw new GitError(`❌ Switch failed: Branch '${branchName}' does not exist.`);
            }
            if (errorMessage.includes('local changes would be overwritten')) {
                throw new GitError(`⚠️ Switch failed: You have uncommitted changes. Please commit or stash them before switching branches.`);
            }

            throw new GitError(errorMessage);
        }
    }


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
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }

    

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
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



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
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }




  
    async stageSelectedFiles(files: string[]): Promise<void> {
        if(files.length === 0) {
            return;
        }
        try {
            await this.git.add(files);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



    async unstageSelectedFiles(files: string[]): Promise<void> {
        if(files.length === 0) {
            return;
        }
        
        try {
            await this.git.reset(['HEAD', '--', ...files])
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



    async getGitDiff() : Promise<string> {
        try {
            const diff = await this.git.diff(['--cached', '--text']);
            return diff;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }


    async stageAllChanges(): Promise<void> {
        try {
            await this.git.add('.');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }



    async pullChanges(remote: string = 'origin', branch: string = ''): Promise<PullResult> {
        try {
            
            const pullArgs: string[] = branch ? [remote, branch] : [remote, 'main'];
            return await this.git.pull(pullArgs);

        }catch (error) {
            if(error instanceof GitError) throw error;

            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';

            if (errorMessage.includes('CONFLICT') || 
                errorMessage.includes('merge failed') || 
                errorMessage.includes('Automatic merge failed')) {

                throw new GitError(`Merge conflict occurred during Git pull: You must resolve the conflicting files manually.`);
            }
    
            throw new GitError(errorMessage);
        }
    }


    async commitChanges(message: string): Promise<void> {
        try {
            await this.git.commit(message);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }


    async pushChanges(remote: string = 'origin', branch: string): Promise<void> {
        try {
            //현재 브랜치 이름 가져오기
            const branchName = branch || await this.git.revparse(['--abbrev-ref', 'HEAD']);
            const pushArgs: string[] = ['push', '--set-upstream', remote, branchName];
            await this.git.raw(pushArgs);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }

 
    async mergeBranches(sourceBranch: string): Promise<string> {
        try {
            const result = await this.git.raw(['merge', sourceBranch]);
            return result.trim();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }


    async deleteLocalBranch(branchName: string): Promise<void> {
        try {
            await this.git.branch(['-d', branchName]);
        }catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            
            // 병합되지 않은 커밋이 있을 경우 오류 메시지를 사용자에게 명확히 전달합니다.
            if (errorMessage.includes('not fully merged')) {
                throw new GitError(`❌ Branch deletion failed: '${branchName}' has unmerged commits.`);
            }
            
            throw new GitError(errorMessage);
        }
    }


    async pruneRemoteBranches(): Promise<void> {
        try {
            await this.git.fetch(['--prune']);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }

    async createTag(tagName: string, message?: string): Promise<void> {
        try {
            const args = message ? ['tag', '-a', tagName, '-m', message] : ['tag', tagName];
            await this.git.raw(args);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Git error';
            throw new GitError(errorMessage);
        }
    }

    async pushTags(tagName?: string): Promise<void> {
        try {
            const pushArgs: string[] = ['push', 'origin'];
            if(tagName) {
                pushArgs.push('refs/tags/' + tagName);
            }else {
                pushArgs.push('--tags');
            }

            await this.git.raw(pushArgs);
        } catch (error) {
            
        }
    }
}