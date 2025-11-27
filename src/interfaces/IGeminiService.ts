export interface IGeminiService {
    /**
     * Git diff와 원하는 개수를 기반으로 새로운 브랜치 이름 목록을 생성
     * 
     * @param diff Git 변경사항을 나타내는 문자열
     * @param count 생성하려는 브랜치 이름의 갯수
     * @returns {Promise<string[]>} Gemini 모델이 생성한 추천 브랜치 이름 목록을 담은 Promise.
     */
    generateBranchNames(diff: string, count: number): Promise<string[]>;


    /**
     * Git diff를 기반으로 커밋 메시지 생성
     * 
     * @param diff Git 변경사항을 나타내는 문자열
     * @returns {Promise<string>} Gemini 모델이 생성한 추천 커밋 메시지를 담은 Promise.
     */
    generateCommitMessage(diff: string, currentBranch: string): Promise<string>;

}