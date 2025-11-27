export interface IGeminiClient {
    /**
     * Gemini API에 텍스트 프롬프트를 전송하고 응답을 받는 메서드.
     * 이 메서드는 클라이언트가 Gemini 모델과 통신하는 핵심 로직을 캡슐화합니다.
     * @param prompt prompt Gemini 모델에 전달할 텍스트 프롬프트
     * @returns {Promise<string>} Gemini API로부터 받은 응답 텍스트를 담은 Promise.
     */
    requestGeminiAPI(prompt: string): Promise<string>;
}