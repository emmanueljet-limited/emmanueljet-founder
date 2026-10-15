import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import logo from '@/public/emmanueljet-white 1.svg';
import lightMode from '@/public/Icon-Button.svg';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const navbar = () => {
  return (
    <>
        <div className='nav-container flex justify-between px-10 items-center mt-0'>
            <div className='1st-nav flex gap-5'>
                <Link href='/'>BOOK APPOINTMENT</Link>
                <Link href='/about'>CONTACT</Link>
            </div>
            <div className='2nd-nav flex h-[100px] w-[287px] items-center justify-center overflow-hidden rounded-b-[24px] border border-white/20 bg-white/[0.06] backdrop-blur-md'>
                    <Image src={logo} alt='Logo Image' />
            </div>
            <div className='3rd-nav flex gap-5 justify-end items-center'>
                <LanguageSwitcher />
                <Image src={lightMode} alt='Light Mode Icon' />
                <Button variant='gradient'>CHAT WITH J2</Button>
            </div>
        </div>
    </>
  );
};

export default navbar;
