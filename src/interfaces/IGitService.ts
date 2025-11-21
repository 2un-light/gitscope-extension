export interface IGitService {
    cloneRepository(url: string, localPath: string): Promise<void>;
    createBranch(branchName: string): Promise<void>;
    getLocalBranches(): Promise<string[]>;
    getCurrentBranchName(): Promise<string>;
    checkout(branchName: string): Promise<void>;
    getModifiedFiles(): Promise<string[]>;
    getStagedFiles(): Promise<string[]>;
    stageSelectedFiles(files: string[]): Promise<void>;
    unstageSelectedFiles(files: string[]): Promise<void>;
    getGitDiff(): Promise<string>;
    stageAllChanges(): Promise<void>;
    pullChanges(remote: string, branch:string): Promise<any>
    commitChanges(message: string): Promise<void>;
    pushChanges(remote: string, branch: string): Promise<void>;
    mergeBranches(sourceBranch: string): Promise<string>;
    deleteLocalBranch(branchName: string): Promise<void>;
    pruneRemoteBranches(): Promise<void>;
    eunsureDRStaged(): Promise<void>;
}