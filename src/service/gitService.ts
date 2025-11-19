import { PullResult, simpleGit, SimpleGit } from "simple-git";
import * as vscode from 'vscode';
import { GitError } from "../errors/Errors";

const workspaceFolders = vscode.workspace.workspaceFolders;
const rootPath = workspaceFolders?.[0].uri.fsPath ?? process.cwd();
const git: SimpleGit = simpleGit(rootPath, { binary: 'git' });


/**
 * 원격 저장소 클론 (git clone)
 * @param url 클론할 원격 저장소의 주소
 * @param localPath localPath 로컬에서 저장될 폴더 경로
 */
export async function cloneRepository(url: string, localPath: string): Promise<void> {
    try {
        await git.clone(url, localPath);
        return;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 브랜치 생성
 * @param branchName 브랜치 이름
 */
export async function createBranch(branchName: string): Promise<void> {
    try {
        await git.branch([branchName]);
        return;
    }catch(error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        if (errorMessage.includes('already exists')) {
            // 이미 존재하는 경우
            throw new GitError(`❌ 브랜치 생성 실패: '${branchName}' 브랜치가 이미 존재합니다.`);
        }
        throw new GitError(errorMessage);
    }
}


/**
 * 브랜치 목록 가져오기
 * @returns string[]
 */
export async function getLocalBranches(): Promise<string[]> {
    try {
        const branches = await git.branchLocal();
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
export async function getCurrentBranchName(): Promise<string> {
    try {
        const branchSummary = await git.branchLocal();
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
export async function checkout(branchName: string): Promise<void> {
    try {
        await git.checkout(branchName);
        return;
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
 * @returns string[]
 */
export async function getUnstagedFiles(): Promise<string[]> {
    try {
        const status = await git.status();
        return status.files.map(file => file.path);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 수정한 파일 목록 가져오기
 * @returns string[]
 */
export async function getModifiedFiles(): Promise<string[]> {
    try {
        const unstaged = await getUnstagedFiles();
        const staged = await getStagedFiles();
        
        const allModified = new Set([...unstaged, ...staged]);
        
        return Array.from(allModified);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 스테이징된 파일 가져오기
 * @returns string[]
 */
export async function getStagedFiles(): Promise<string[]> {
    try {
        const result = await git.diff(['--cached', '--name-only']);

        const files = result
            .split('\n')
            .map(f => f.trim())
            .filter(f => f.length > 0);

        return files;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 선택된 파일 Staging
 * @param files string[]
 */
export async function stageSelectedFiles(files: string[]): Promise<void> {
    if(files.length === 0) {
        return;
    }
    try {
        await git.add(files);
        return;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 선택 파일 unStaging
 * @param files string[]
 */
export async function unstageSelectedFiles(files: string[]): Promise<void> {
    if(files.length === 0) {
        return;
    }

    try {
        await git.reset(['HEAD', '--', ...files])
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * Staging된 변경사항 Diff 수집
 * @returns string
 */
export async function getGitDiff() : Promise<string> {
    try {
        const diff = await git.diff(['--cached', '--text']);
        return diff;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}


/**
 * 모든 변경사항 Staging
 */
export async function stageAllChanges(): Promise<void> {
    try {
        await git.add('.');
        return;
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
export async function pullChanges(remote: string = 'origin', branch: string = ''): Promise<PullResult> {
    try {
        let targetBranch = branch; 

        //pull 대상 브랜치가 명시되지 않았다면, 현재 로컬 브랜치 이름을 가져옴.
        if(!targetBranch) {
            targetBranch = await git.revparse(['--abbrev-ref', 'HEAD']);
        }

        //pull 실행
        return await git.pull([remote, targetBranch, '--allow-unrelated-histories']);

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
export async function commitChanges(message: string): Promise<void> {
    try {
        await git.commit(message);
        return;
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
export async function pushChanges(remote: string = 'origin', branch: string = '') {
    try {
        //현재 브랜치 이름 가져오기
        const branchName = branch || await git.revparse(['--abbrev-ref', 'HEAD']);

        const pushArgs: string[] = ['push', '--set-upstream', remote, branchName];
        return await git.raw(pushArgs);
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
export async function mergeBranches(sourceBranch: string): Promise<string> {
    try {
        const result = await git.raw(['merge', sourceBranch]);
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
export async function deleteLocalBranch(branchName: string): Promise<void> {
    try {
        await git.branch(['-d', branchName]);
        return;
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
export async function pruneRemoteBranches(): Promise<void> {
    try {
        await git.fetch(['--prune']);
        return;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 Git 오류';
        throw new GitError(errorMessage);
    }
}