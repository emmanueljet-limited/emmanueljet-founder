import type { ILanguageOption } from '@/types/language';

/**
 * The list of languages supported across the application.
 */
export const SUPPORTED_LANGUAGES: readonly ILanguageOption[] = [
  {
    code: 'EN',
    locale: 'en',
    label: 'English',
  },
  {
    code: 'FR',
    locale: 'fr',
    label: 'French',
  },
  {
    code: 'ES',
    locale: 'es',
    label: 'Spanish',
  },
] as const;

/**
 * The fallback language when no user preference is detected.
 */
export const DEFAULT_LANGUAGE: ILanguageOption = SUPPORTED_LANGUAGES[0];

/**
 * The localStorage key used to store the user selected language preference.
 */
export const LANGUAGE_STORAGE_KEY = 'emmanueljet_selected_language';
