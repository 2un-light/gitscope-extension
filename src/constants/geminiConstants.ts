import { ITranslations } from "../i18n/i18n";

type ModelI18nKey = keyof ITranslations['models'];

export const GEMINI_MODELS = {
    // 무료 티어
    FLASH_LITE: {
        name: "gemini-2.5-flash-lite",
        displayNameKey: "flashLite" as ModelI18nKey,
        tier: "free",
        descriptionKey: "flashLiteDesc" as ModelI18nKey,
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent"
    },
    FLASH_2_5: {
        name: "gemini-2.5-flash",
        displayNameKey: "flash25" as ModelI18nKey,
        tier: "free",
        descriptionKey: "flash25Desc" as ModelI18nKey,
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"
    },
    FLASH_2_0: {
        name: "gemini-2.0-flash",
        displayNameKey: "flash20" as ModelI18nKey,
        tier: "free",
        descriptionKey: "flash20Desc" as ModelI18nKey,
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"
    },
    
    // 유료 티어
    PRO_2_5: {
        name: "gemini-2.5-pro",
        displayNameKey: "pro25" as ModelI18nKey,
        tier: "paid",
        descriptionKey: "pro25Desc" as ModelI18nKey,
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent"
    },
    PRO_3: {
        name: "gemini-3-pro",
        displayNameKey: "pro3" as ModelI18nKey,
        tier: "paid",
        descriptionKey: "pro3Desc" as ModelI18nKey,
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-3-pro:generateContent"
    }
} as const;

export const GEMINI_KEY_NAME = "geminiApiKey";
export const GEMINI_MODEL_KEY_NAME = "geminiModel";
export const DEFAULT_MODEL = GEMINI_MODELS.FLASH_2_5;