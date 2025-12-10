export interface IGeminiClient {
    /**
     *  공통 API 요청 함수
     * @param prompt 요청 프롬프트
     * @returns string
     */
    requestGeminiAPI(prompt: string): Promise<string>;
}