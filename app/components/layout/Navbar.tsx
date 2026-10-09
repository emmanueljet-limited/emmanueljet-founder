import React from 'react'
import Button from '../ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../../public/logo.png"
import lightMode from "../../../public/light-mode.png"
import LanguageSwitcher from '../ui/LanguageSwitcher'

const navbar = () => {
  return (
    <>
        <div className="nav-container flex justify-between px-10 items-center mt-0">
            <div className="1st-nav flex gap-5">
                <Link href="/">BOOK APPOINTMENT</Link>
                <Link href="/about">CONTACT</Link>
            </div>
            <div className="2nd-nav">
                <Image src={logo} alt="Logo Image" />
            </div>
            <div className="3rd-nav flex gap-5 justify-end items-center">
                <LanguageSwitcher />
                <Image src={lightMode} alt="Light Mode Icon" />
                <Button variant="gradient">CHAT WITH J2</Button>
            </div>
        </div>
    </>
  )
}

export default navbar