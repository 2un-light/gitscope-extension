import axios from "axios";
import { GeminiRequest, GeminiResponse } from "../types/geminiTypes";
import { ApiKeyInvalidError, HttpError, QuotaError } from "../errors/Errors";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { IGeminiClient } from "../interfaces/IGeminiClientService";
import { IConfigService } from "../interfaces/IConfigService";
import { DEFAULT_MODEL, GEMINI_MODELS } from "../constants/geminiConstants";

export class GeminiClient implements IGeminiClient {

    constructor(
        private apiKey: string,
        private configService: IConfigService,
    ) {}

    /**
     * 현재 선택된 모델의 API URL 가져오기
     */
    private async getApiUrl(): Promise<string> {
        const selectedModel: string = (await this.configService.get<string>()) ?? DEFAULT_MODEL.name;

        const model = Object.values(GEMINI_MODELS).find(
            m => m.name === selectedModel
        );

        return model?.url ?? DEFAULT_MODEL.url;

    }
    
    async requestGeminiAPI(prompt: string): Promise<string> {

        const requestBody: GeminiRequest = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        try {
            const apiUrl = await this.getApiUrl();
            const response = await axios.post<GeminiResponse>(
                `${apiUrl}?key=${this.apiKey}`,
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
                    throw new QuotaError(status, ERROR_MESSAGES.quotaExceeded, detail);
                }

                throw new HttpError(status, detail);

            }

            throw new HttpError(status, detail);
        }
    }
}