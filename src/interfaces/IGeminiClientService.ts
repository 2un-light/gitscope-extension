export interface IGeminiClient {
    requestGeminiAPI(prompt: string): Promise<string>;
}