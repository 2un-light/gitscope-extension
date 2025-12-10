export const GEMINI_MODELS = {
    // 무료 티어
    FLASH_LITE: {
        name: "gemini-2.5-flash-lite",
        displayName: "Gemini 2.5 Flash-Lite (무료)",
        tier: "free",
        description: "대량 처리에 최적화된 경량 모델, 빠른 응답 속도",
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent"
    },
    FLASH_2_5: {
        name: "gemini-2.5-flash",
        displayName: "Gemini 2.5 Flash (무료) (추천)",
        tier: "free",
        description: "속도와 품질의 균형, 일반적인 커밋 메시지 생성에 최적",
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"
    },
    FLASH_2_0: {
        name: "gemini-2.0-flash",
        displayName: "Gemini 2.0 Flash (무료)",
        tier: "free",
        description: "안정적인 범용 모델, 비용 효율적",
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"
    },
    
    // 유료 티어
    PRO_2_5: {
        name: "gemini-2.5-pro",
        displayName: "Gemini 2.5 Pro (유료)",
        tier: "paid",
        description: "복잡한 코드 분석과 상세한 커밋 메시지 생성, 높은 정확도",
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent"
    },
    PRO_3: {
        name: "gemini-3-pro",
        displayName: "Gemini 3 Pro (유료)",
        tier: "paid",
        description: "최신 최고 성능 모델, 복잡한 코딩 작업에 최적",
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-3-pro:generateContent"
    }
}as const;

export const GEMINI_KEY_NAME = "geminiApiKey";
export const GEMINI_MODEL_KEY_NAME = "geminiModel";
export const DEFAULT_MODEL = GEMINI_MODELS.FLASH_2_5;