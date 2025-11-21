import axios from "axios";
import { GeminiRequest, GeminiResponse } from "../types/geminiTypes";
import { ApiKeyInvalidError, HttpError, QuotaError } from "../errors/Errors";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { IGeminiClient } from "../interfaces/IGeminiClientService";
import { GEMINI_API_URL } from "../constants/geminiConstants";

export class GeminiClient implements IGeminiClient {

    constructor(private apiKey: string) {}

    /**
     *  공통 API 요청 함수
     * @param prompt 요청 프롬프트
     * @returns GeminiResponse
     * 역할:
     * 1. HTTP 통신 (axios) 처리
     * 2. HTTP 상태 코드 기반 오류 반환 (400번대)
     * 3. 응답에서 최종 텍스트를 파싱
     */
    async requestGeminiAPI(prompt: string): Promise<string> {

        const requestBody: GeminiRequest = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        try {
            const response = await axios.post<GeminiResponse>(
                `${GEMINI_API_URL}?key=${this.apiKey}`,
                requestBody
            );

            //응답 데이터 파싱
            const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            return text?.trim() ?? "";

        } catch (error: any) {
            const status = error.response?.status;
            const detail = error.response?.data?.error.message ?? "상세 오류 없음";
            if(axios.isAxiosError(error)) {

                if(typeof status === "number" && [400, 401, 403].includes(status)) {
                    throw new ApiKeyInvalidError(status, ERROR_MESSAGES.apiKeyInvalid, detail);
                }

                if(status === 429) {
                    throw new QuotaError(status, ERROR_MESSAGES.apiKeyInvalid);
                }

                throw new HttpError(status, detail);

            }

            throw new HttpError(status, detail);
        }
    }
}