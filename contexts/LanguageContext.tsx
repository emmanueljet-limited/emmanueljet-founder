'use client';

import type { ReactNode } from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from 'react';

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from '@/constants/languages';
import type { ILanguageContextState, ILanguageOption } from '@/types/language';

/**
 * Custom event name dispatched when language changes within the current window.
 */
const LANGUAGE_CHANGE_EVENT = 'emmanueljet_language_change';

/**
 * Subscribes to storage events and local dispatch events for language synchronization.
 *
 * @param callback - Event listener to trigger on state change.
 * @returns Cleanup function to remove event listeners.
 */
const subscribeLanguage = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('storage', callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
};

/**
 * Reads the current language code snapshot from localStorage.
 *
 * @returns The stored language code, or default language code if unavailable.
 */
const getLanguageSnapshot = (): string => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE.code;
  }

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? DEFAULT_LANGUAGE.code;
  } catch {
    return DEFAULT_LANGUAGE.code;
  }
};

/**
 * Server snapshot fallback for SSR.
 *
 * @returns The default language code.
 */
const getServerLanguageSnapshot = (): string => {
  return DEFAULT_LANGUAGE.code;
};

/**
 * Props for the LanguageProvider component.
 */
export interface ILanguageProviderProps {
  /**
   * Child components wrapped by the provider.
   */
  readonly children: ReactNode;
}

/**
 * React context for application-wide language preferences.
 */
export const LanguageContext = createContext<ILanguageContextState | undefined>(
  undefined
);

/**
 * Provider component that manages the active language state and persists preferences.
 *
 * @param props - Component properties containing children.
 * @returns The provider element wrapping children with language state.
 */
export const LanguageProvider = ({ children }: ILanguageProviderProps) => {
  const languageCode = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  const currentLanguage = useMemo<ILanguageOption>(() => {
    const matched = SUPPORTED_LANGUAGES.find((lang) => lang.code === languageCode);
    return matched ?? DEFAULT_LANGUAGE;
  }, [languageCode]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage.locale;
    }
  }, [currentLanguage]);

  const setLanguage = useCallback((newLanguage: ILanguageOption) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage.code);
        window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT));
      } catch {
        // Gracefully ignore storage write failures
      }
    }
  }, []);

  const contextValue = useMemo<ILanguageContextState>(
    () => ({
      currentLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      setLanguage,
    }),
    [currentLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access the current language state and switching functions.
 *
 * @returns The active language context state.
 */
export const useLanguage = (): ILanguageContextState => {
  const context = useContext(LanguageContext);

  if (!context) {
    return {
      currentLanguage: DEFAULT_LANGUAGE,
      supportedLanguages: SUPPORTED_LANGUAGES,
      setLanguage: () => {},
    };
  }

  return context;
};
