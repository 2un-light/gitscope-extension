export interface GeminiRequest {
    contents: Array<{
        parts: Array<{
            text: string;
        }>;
    }>;
}

export interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?:string;
            }>;
        };
    }>;
}