import { ITranslations } from "../i18n/i18n";

export interface II18nProvider {
    t(): ITranslations;
}