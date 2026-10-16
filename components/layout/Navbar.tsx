'use client';

import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import lightMode from '@/public/Icon-Button.svg';
import logo from '@/public/emmanueljet-white-1.svg';
import { useLanguage } from '@/contexts/LanguageContext';
import { NAVBAR_TRANSLATIONS } from '@/constants/translations';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

/**
 * Main application navigation bar with dynamic localization,
 * branding, navigation links, and action buttons.
 *
 * @returns The rendered navigation landmark element.
 */
const Navbar = () => {
  const { currentLanguage } = useLanguage();
  const translations =
    NAVBAR_TRANSLATIONS[currentLanguage.code] ?? NAVBAR_TRANSLATIONS.EN;

  return (
    <nav
      aria-label='Main navigation'
      className='nav-container mt-0 flex items-center justify-between px-10'
    >
      <div className='1st-nav flex gap-5'>
        <Link
          href='/'
          className='transition-colors hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
        >
          {translations.bookAppointment}
        </Link>
        <Link
          href='/about'
          className='transition-colors hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
        >
          {translations.contact}
        </Link>
      </div>

      <div className='2nd-nav flex h-[100px] w-[287px] items-center justify-center overflow-hidden rounded-b-[24px] border border-white/20 bg-white/[0.06] backdrop-blur-md'>
        <Image
          src={logo}
          alt='emmanueljet logo'
          priority
        />
      </div>

      <div className='3rd-nav flex items-center justify-end gap-5'>
        <LanguageSwitcher />
        <button
          type='button'
          aria-label='Toggle color theme'
          className='flex items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
        >
          <Image src={lightMode} alt='' aria-hidden='true' />
        </button>
        <Button variant='gradient'>{translations.chatWithJ2}</Button>
      </div>
    </nav>
  );
};

export default Navbar;
