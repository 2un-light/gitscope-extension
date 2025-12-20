import { InvalidArgumentError, MissingApiKeyError } from '../errors/Errors';
import { IGeminiService } from '../interfaces/IGeminiService';
import { IGeminiClient } from '../interfaces/IGeminiClientService';
import { IConfigService } from '../interfaces/IConfigService';
import { II18nProvider } from "../interfaces/II18nProvider";

export class GeminiService implements IGeminiService {
    constructor(
        private configService: IConfigService,
        private clientFactory: (apiKey: string, config: IConfigService) => IGeminiClient,
    ){}

    
    /**
     * 로컬에 저장된 geminiAPI키 가져오기
     * @returns 
     */
    private async getApiKey(t: ReturnType<II18nProvider['t']>): Promise<string> {
        const key = await this.configService.getSecret();
        if(!key) throw new MissingApiKeyError(t.errors.missingApiKey);
        return key;
    }

    /**
     * 커밋 메시지 생성
     * @param diff Git diff
     * @param apiKey Gemini API Key
     * @param return string
     */
    async generateCommitMessage(diff: string, currentBranch: string, t: ReturnType<II18nProvider['t']>): Promise<string> {
        if(!diff?.trim()) {
            throw new InvalidArgumentError(t.errors.invalidDiff);
        }

        const apiKey = await this.getApiKey(t);
        const client = this.clientFactory(apiKey, this.configService);

        const prompt = t.prompts.commitMessage(diff, currentBranch);
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
        count: number,
        t: ReturnType<II18nProvider['t']>,
    ): Promise<string[]> {
        if(!diff?.trim()) {
            throw new InvalidArgumentError(t.errors.invalidDiff);
        }

        const apiKey = await this.getApiKey(t);
        const client = this.clientFactory(apiKey, this.configService);

        const prompt = t.prompts.branchNames(diff, count);
        const raw = await client.requestGeminiAPI(prompt);

        return raw.split(",").map(s => s.trim()).filter(Boolean);
    }



}