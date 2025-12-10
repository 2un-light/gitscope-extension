import { PROMPTS } from "../constants/prompts";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { InvalidArgumentError, MissingApiKeyError } from '../errors/Errors';
import { IGeminiService } from '../interfaces/IGeminiService';
import { IGeminiClient } from '../interfaces/IGeminiClientService';
import { IConfigService } from '../interfaces/IConfigService';

export class GeminiService implements IGeminiService {
    constructor(
        private configService: IConfigService,
        private clientFactory: (apiKey: string, config: IConfigService) => IGeminiClient,
    ){}

    
    /**
     * 로컬에 저장된 geminiAPI키 가져오기
     * @returns 
     */
    private async getApiKey(): Promise<string> {
        const key = await this.configService.getSecret();
        if(!key) throw new MissingApiKeyError(ERROR_MESSAGES.missingApiKey);
        return key;
    }

    /**
     * 커밋 메시지 생성
     * @param diff Git diff
     * @param apiKey Gemini API Key
     * @param return string
     */
    async generateCommitMessage(diff: string, currentBranch: string): Promise<string> {
        if(!diff?.trim()) {
            throw new InvalidArgumentError(ERROR_MESSAGES.invalidDiff);
        }

        const apiKey = await this.getApiKey();
        const client = this.clientFactory(apiKey, this.configService);

        const prompt = PROMPTS.commitMessage(diff, currentBranch);
        return client.requestGeminiAPI(prompt);
    }


    /**
     * 브랜치 이름 생성
     * @param diff Git diff
     * @param count 브랜치 이름 생성 갯수
     * @param apiKey Gemini API Key
     * @returns string[]
     */
    async generateBranchNames(
        diff: string,
        count: number
    ): Promise<string[]> {
        
        if(!diff?.trim()) {
            throw new InvalidArgumentError(ERROR_MESSAGES.invalidDiff);
        }

        if(!count || count < 1) {
            throw new InvalidArgumentError(ERROR_MESSAGES.invalidCount);
        }

        const apiKey = await this.getApiKey();
        const client = this.clientFactory(apiKey, this.configService);

        const prompt = PROMPTS.branchNmaes(diff, count);
        const raw = await client.requestGeminiAPI(prompt);

        return raw.split(",").map(s => s.trim()).filter(Boolean);
    }



}