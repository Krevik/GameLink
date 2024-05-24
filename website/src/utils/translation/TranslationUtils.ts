import { TranslationBaseDictionary } from "./TranslationBaseDictionary.ts";
import { EnglishDictionary } from "./dictionaries/EnglishDictonary.ts";

const currentLanguage: string = "english";

export const TranslationUtils = {
    get: (text: keyof TranslationBaseDictionary) => getCurrentLanguageDictionary(currentLanguage)[text],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getAnything: (text: string) => getCurrentLanguageDictionary(currentLanguage)[text] ?? text,
};

export const translate = TranslationUtils.get;
export const translateAnything = TranslationUtils.getAnything;

const getCurrentLanguageDictionary = (language: string) => {
    switch (language) {
        default:
            return EnglishDictionary;
    }
};
