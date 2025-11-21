export interface IGeminiService {
    generateCommitMessage(diff: string): Promise<string>;
    generateBranchNames(diff: string, count: number): Promise<string[]>;
}