'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';
import type { ILanguageOption, ILanguageSwitcherProps } from '@/types/language';

/**
 * An accessible language switcher dropdown component that allows users
 * to select their preferred language across the application.
 *
 * @param props - Component properties.
 * @returns The rendered LanguageSwitcher dropdown element.
 */
const LanguageSwitcher = ({
  className = '',
  onLanguageChange,
}: ILanguageSwitcherProps) => {
  const { currentLanguage, supportedLanguages, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle selecting a language option
  const handleSelectLanguage = useCallback(
    (language: ILanguageOption) => {
      setLanguage(language);
      onLanguageChange?.(language);
      setIsOpen(false);
      buttonRef.current?.focus();
    },
    [setLanguage, onLanguageChange]
  );

  // Keyboard navigation on trigger button
  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      setIsOpen(true);

      // Focus the currently selected language option or the first one after opening
      requestAnimationFrame(() => {
        const selectedIndex = supportedLanguages.findIndex(
          (lang) => lang.code === currentLanguage.code
        );
        const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
        optionsRef.current[targetIndex]?.focus();
      });
    }
  };

  // Keyboard navigation inside the dropdown options list
  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case 'Escape': {
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      }
      case 'Tab': {
        setIsOpen(false);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (index + 1) % supportedLanguages.length;
        optionsRef.current[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex =
          (index - 1 + supportedLanguages.length) % supportedLanguages.length;
        optionsRef.current[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        event.preventDefault();
        optionsRef.current[0]?.focus();
        break;
      }
      case 'End': {
        event.preventDefault();
        optionsRef.current[supportedLanguages.length - 1]?.focus();
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        ref={buttonRef}
        type='button'
        id='language-switcher-button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls='language-switcher-menu'
        aria-label={`Select language. Current language is ${currentLanguage.label}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className='flex items-center gap-2 rounded-full border border-neutral-300/40 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md transition-colors duration-200 hover:bg-neutral-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-white/15 dark:bg-white/[0.05] dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#11071F]'
      >
        <Globe size={16} aria-hidden='true' />
        <span className='font-semibold'>{currentLanguage.code}</span>
        <ChevronDown
          size={14}
          aria-hidden='true'
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          id='language-switcher-menu'
          role='listbox'
          aria-labelledby='language-switcher-button'
          className='absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-neutral-200/80 bg-white/95 p-1 text-neutral-900 shadow-xl backdrop-blur-md transition-all duration-150 dark:border-white/10 dark:bg-[#180A2B]/95 dark:text-neutral-100'
        >
          {supportedLanguages.map((language, index) => {
            const isSelected = language.code === currentLanguage.code;

            return (
              <li key={language.code} role='none'>
                <button
                  ref={(element) => {
                    optionsRef.current[index] = element;
                  }}
                  id={`language-option-${language.code}`}
                  role='option'
                  type='button'
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(language)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none dark:hover:bg-white/10 dark:focus-visible:bg-white/10 ${
                    isSelected
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-200'
                  }`}
                >
                  <span className='flex items-center gap-2'>
                    <span className='rounded bg-neutral-200/60 px-1.5 py-0.5 text-[10px] font-bold text-neutral-800 dark:bg-white/10 dark:text-neutral-200'>
                      {language.code}
                    </span>
                    <span>{language.label}</span>
                  </span>
                  {isSelected && (
                    <Check
                      size={14}
                      className='text-purple-600 dark:text-purple-400'
                      aria-hidden='true'
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
