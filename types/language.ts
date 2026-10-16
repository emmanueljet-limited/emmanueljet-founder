/**
 * Represents a supported language option.
 */
export interface ILanguageOption {
  /**
   * The short uppercase code representing the language (e.g. 'EN', 'FR', 'ES').
   */
  readonly code: string;

  /**
   * The BCP 47 language tag used for the document language attribute (e.g. 'en', 'fr', 'es').
   */
  readonly locale: string;

  /**
   * The human-readable name of the language (e.g. 'English', 'French', 'Spanish').
   */
  readonly label: string;
}

/**
 * Interface representing the state and methods provided by the Language Context.
 */
export interface ILanguageContextState {
  /**
   * The currently active language option.
   */
  readonly currentLanguage: ILanguageOption;

  /**
   * The list of all supported language options.
   */
  readonly supportedLanguages: readonly ILanguageOption[];

  /**
   * Function to update the active language.
   *
   * @param language - The new language option to set as active.
   */
  readonly setLanguage: (language: ILanguageOption) => void;
}

/**
 * Props for the LanguageSwitcher UI component.
 */
export interface ILanguageSwitcherProps {
  /**
   * Optional custom CSS class name to style the container.
   */
  readonly className?: string;

  /**
   * Optional callback invoked when the user selects a language.
   *
   * @param language - The newly selected language option.
   */
  readonly onLanguageChange?: (language: ILanguageOption) => void;
}
