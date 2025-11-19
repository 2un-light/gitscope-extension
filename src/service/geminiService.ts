import * as vscode from 'vscode';

import axios from "axios";
import { GeminiRequest, GeminiResponse } from "../types/geminiTypes";
import { PROMPTS } from "../constants/prompts";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { GEMINI_API_URL } from "../constants/geminiApiURL";
import { getAPIKeyFromStore } from "../utils/keyUtils";
import { ApiKeyInvalidError, GeminiResponseParseError, HttpError, InvalidArgumentError, MissingApiKeyError, QuotaError } from '../errors/Errors';


async function getApiKey(context: vscode.ExtensionContext): Promise<string> {
    const key = await getAPIKeyFromStore(context);
    if(!key) throw new MissingApiKeyError(ERROR_MESSAGES.missingApiKey);
    return key;
}

/**
 *  공통 API 요청 함수
 * @param prompt 요청 프롬프트
 * @param apiKey Gemini API Key
 * @returns GeminiResponse
 */
async function requestGeminiAPI(prompt: string, apiKey?: string): Promise<GeminiResponse> {
    if(!apiKey) {
        throw new MissingApiKeyError(ERROR_MESSAGES.missingApiKey);
    }

    const requestBody: GeminiRequest = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await axios.post<GeminiResponse>(
            `${GEMINI_API_URL}?key=${apiKey}`,
            requestBody
        );

        return response.data;

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

/**
 * 공통 응답 파싱
 * @param data 
 * @returns string
 */
function parseTextResponse(data: GeminiResponse): string {
    try {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if(!text) throw new Error();
        return text.trim();
    } catch (error) {
        throw new GeminiResponseParseError(ERROR_MESSAGES.parseFailed);
    }
}


/**
 * 커밋 메시지 생성
 * @param diff Git diff
 * @param apiKey Gemini API Key
 * @param return string
 */
export async function generateCommitMessage(context: vscode.ExtensionContext, diff: string): Promise<string> {
    const apiKey = await getApiKey(context);
    if(!diff || diff.trim().length === 0) {
        throw new InvalidArgumentError(ERROR_MESSAGES.invalidDiff);
    }

    const prompt = PROMPTS.commitMessage(diff);
    const result = await requestGeminiAPI(prompt, apiKey);

    return parseTextResponse(result);
}


/**
 * 브랜치 이름 생성
 * @param diff Git diff
 * @param count 브랜치 이름 생성 갯수
 * @param apiKey Gemini API Key
 * @returns string[]
 */
export async function generateBranchNames(
    diff: string,
    count: number,
    context: vscode.ExtensionContext
): Promise<string[]> {
    const apiKey = await getApiKey(context);
    
    if(!diff || diff.trim().length === 0) {
        throw new InvalidArgumentError(ERROR_MESSAGES.invalidDiff);
    }

    if(!count || count < 1) {
        throw new InvalidArgumentError(ERROR_MESSAGES.invalidCount);
    }

    const prompt = PROMPTS.branchNmaes(diff, count);
    const result = await requestGeminiAPI(prompt, apiKey);

    const raw = parseTextResponse(result);

    return raw.split(",").map((v) => v.trim()).filter((v) => v.length > 0);
}
