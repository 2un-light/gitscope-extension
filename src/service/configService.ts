import * as vscode from 'vscode';
import { IConfigService } from '../interfaces/IConfigService';
import { GEMINI_KEY_NAME, GEMINI_MODEL_KEY_NAME } from '../constants/geminiConstants';

export class ConfigService implements IConfigService {
    constructor(private context: vscode.ExtensionContext){}

    async get<T>(): Promise<T | undefined> {
        return this.context.globalState.get<T>(GEMINI_MODEL_KEY_NAME);
    }

    async update(value: any): Promise<void> {
        await this.context.globalState.update(GEMINI_MODEL_KEY_NAME, value);
    }

    async has(): Promise<boolean> {
        const keys = this.context.globalState.keys();
        return keys.includes(GEMINI_MODEL_KEY_NAME);
    }

    async delete(): Promise<void> {
        await this.context.globalState.update(GEMINI_MODEL_KEY_NAME, undefined);
    }

    async storeSecret(value: string): Promise<void> {
        await this.context.secrets.store(GEMINI_KEY_NAME, value);
    }
    
    async getSecret(): Promise<string | undefined> {
        return await this.context.secrets.get(GEMINI_KEY_NAME);
    }

    async deleteSecret(): Promise<void> {
        await this.context.secrets.delete(GEMINI_KEY_NAME);
    }

    async clearAll(): Promise<void> {
        const keys = this.context.globalState.keys();
        for (const key of keys) {
            await this.context.globalState.update(key, undefined);
        }
    }
    
}