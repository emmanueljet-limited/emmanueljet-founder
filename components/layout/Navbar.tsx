'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { NAVBAR_TRANSLATIONS } from '@/constants/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import lightMode from '@/public/Icon-Button.svg';
import logo from '@/public/emmanueljet-white-1.svg';

/**
 * Main application navigation bar with responsive adaptation for all screen sizes,
 * localization support, branding notch, and an accessible mobile navigation menu.
 *
 * @returns The rendered navigation header landmark element.
 */
const Navbar = () => {
  const { currentLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translations =
    NAVBAR_TRANSLATIONS[currentLanguage.code] ?? NAVBAR_TRANSLATIONS.EN;

  // Dismiss mobile drawer when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className='relative z-40 w-full'>
      <nav
        aria-label='Main navigation'
        className='mx-auto flex w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10'
      >
        {/* Desktop Left Navigation Links */}
        <div className='hidden items-center gap-6 lg:flex xl:gap-8'>
          <Link
            href='/'
            className='text-xs font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:text-purple-400 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            {translations.bookAppointment}
          </Link>
          <Link
            href='/about'
            className='text-xs font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:text-purple-400 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            {translations.contact}
          </Link>
        </div>

        {/* Mobile Left Spacer to keep notch centered */}
        <div className='w-20 lg:hidden' aria-hidden='true' />

        {/* Signature Center Logo Notch */}
        <div className='flex h-[60px] w-[160px] items-center justify-center overflow-hidden rounded-b-[20px] border border-white/20 bg-white/[0.06] shadow-lg shadow-purple-950/10 backdrop-blur-md sm:h-[72px] sm:w-[200px] sm:rounded-b-[22px] lg:h-[96px] lg:w-[287px] lg:rounded-b-[24px]'>
          <Link
            href='/'
            aria-label='Emmanuel Jet homepage'
            className='flex items-center justify-center transition-opacity hover:opacity-90 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            <Image
              src={logo}
              alt='Emmanuel Jet logo'
              priority
              className='h-auto w-24 sm:w-28 lg:w-36'
            />
          </Link>
        </div>

        {/* Desktop Right Action Controls */}
        <div className='hidden items-center justify-end gap-4 lg:flex xl:gap-5'>
          <LanguageSwitcher />
          <button
            type='button'
            aria-label='Toggle color theme'
            className='flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            <Image src={lightMode} alt='' aria-hidden='true' />
          </button>
          <Button variant='gradient'>{translations.chatWithJ2}</Button>
        </div>

        {/* Mobile / Tablet Controls */}
        <div className='flex w-20 items-center justify-end gap-2 lg:hidden sm:gap-3'>
          <button
            type='button'
            aria-label='Toggle color theme'
            className='flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            <Image src={lightMode} alt='' aria-hidden='true' className='h-8 w-8' />
          </button>

          <button
            type='button'
            aria-label={
              isMobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-navigation-menu'
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden='true' />
            ) : (
              <Menu size={20} aria-hidden='true' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          id='mobile-navigation-menu'
          className='mx-4 mt-2 flex flex-col gap-4 rounded-2xl border border-white/15 bg-[#11071F]/95 p-5 shadow-2xl shadow-purple-950/40 backdrop-blur-xl lg:hidden'
        >
          <div className='flex flex-col gap-2'>
            <Link
              href='/'
              onClick={() => setIsMobileMenuOpen(false)}
              className='rounded-lg px-3 py-2 text-sm font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white/10 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
            >
              {translations.bookAppointment}
            </Link>
            <Link
              href='/about'
              onClick={() => setIsMobileMenuOpen(false)}
              className='rounded-lg px-3 py-2 text-sm font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white/10 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
            >
              {translations.contact}
            </Link>
          </div>

          <div className='h-px w-full bg-white/10' />

          <div className='flex items-center justify-between px-1'>
            <span className='text-xs font-medium text-neutral-400'>
              Language
            </span>
            <LanguageSwitcher />
          </div>

          <Button
            variant='gradient'
            className='w-full justify-center'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {translations.chatWithJ2}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
