import { GitFileStatus } from "../types/gitTypes";

export interface IGitService {
    cloneRepository(url: string, localPath: string): Promise<void>;
    createBranch(branchName: string): Promise<void>;
    getLocalBranches(): Promise<string[]>;
    getCurrentBranchName(): Promise<string>;
    checkout(branchName: string): Promise<void>;

    getUnstagedFiles(): Promise<GitFileStatus[]>;
    getStagedFiles(): Promise<GitFileStatus[]>;
    getModifiedFiles(): Promise<GitFileStatus[]>;

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
}