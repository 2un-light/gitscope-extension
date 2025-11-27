import { GitFileStatus } from "../types/gitTypes";

export interface IGitService {
    /**
     * 원격 저장소 클론 (git clone)
     * @param url 클론할 원격 저장소의 주소
     * @param localPath localPath 로컬에서 저장될 폴더 경로
     */
    cloneRepository(url: string, localPath: string): Promise<void>;
    
    /**
     * 브랜치 생성
     * @param branchName 브랜치 이름
     */
    createBranch(branchName: string): Promise<void>;
    
    /**
     * 브랜치 목록 가져오기
     * @returns string[]
     */
    getLocalBranches(): Promise<string[]>;

    /**
     * 현재 체크아웃되어있는 브랜치 이름 가져오기
     * @returns string
     */
    getCurrentBranchName(): Promise<string>;


    /**
     * 브랜치 전환
     * @param branchName 브랜치 이름 
     */
    checkout(branchName: string): Promise<void>;

    /**
     * UnStaging 파일 목록 가져오기
     * @returns GitFileStatus[]
     */
    getUnstagedFiles(): Promise<GitFileStatus[]>;

    /**
     * Staging 파일 목록 가져오기
     * @returns GitFileStatus[]
     */
    getStagedFiles(): Promise<GitFileStatus[]>;

    /**
     * 수정한 파일 목록 가져오기
     * @returns GitFileStatus[]
     */
    getModifiedFiles(): Promise<GitFileStatus[]>;

    /**
     * 선택된 파일 Staging
     * @param files 파일 목록 string[]
     */
    stageSelectedFiles(files: string[]): Promise<void>;

    /**
     * 선택 파일 UnStaging
     * @param files 파일 목록 string[]
     */
    unstageSelectedFiles(files: string[]): Promise<void>;

    /**
     * Staging된 변경사항 Diff 수집
     * @returns string
     */
    getGitDiff(): Promise<string>;
    
    /**
     * 모든 변경사항 Staging
     */
    stageAllChanges(): Promise<void>;

    /**
     * 원격 변경사항 pull
     * @param remote 'origin' string
     * @param branch string
     * @returns PullResult
     */
    pullChanges(remote: string, branch:string): Promise<any>;

    /**
     * Git Commit
     * @param message 커밋 메시지 string
     */
    commitChanges(message: string): Promise<void>;

    /**
     * 원격 저장소로 Push
     * @param remote 'origin' string
     * @param branch string
     */
    pushChanges(remote: string, branch: string): Promise<void>;

    /**
     * merge 수행
     * @param sourceBranch string
     * @returns string
     */
    mergeBranches(sourceBranch: string): Promise<string>;

    /**
     * Branch 삭제
     * @param branchName 브랜치 이름 string
     */
    deleteLocalBranch(branchName: string): Promise<void>;

    /**
     * 원격에서 삭제된 브랜치 로컬에서 정리
     */
    pruneRemoteBranches(): Promise<void>;

    /**
     * 지정된 이름으로 태그 생성
     * @param tagName 생성할 태그 이름(예: v1.0.0)
     * @param message 태그에 사용될 메시지
     */
    createTag(tagName: string, message?:string): Promise<void>;

    /**
     * 원격 저장소에 모든 태그 또는 특정 태그를 푸쉬
     * @param tagName 푸쉬할 특정 태그 이름
     */
    pushTags(tagName?: string): Promise<void>;

}