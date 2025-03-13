"use client"

import { logoIconUrl, logoutIconUrl, menuIconUrl, navItems } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { SidebarProps } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { signOut } from '@/lib/actions/user.actions';
import { Separator } from './ui/separator';

const MobileNav = ({name, email, avatar}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <header className='mobile-header'>
      <Image src={logoIconUrl} alt='logo' width={350} height={50} className='h-auto'/>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image src={menuIconUrl} alt='menu' width={30} height={30}/>
        </SheetTrigger>
        <SheetContent className='shad-sheet h-screen px-3'>
          <SheetTitle className='mb-8'>
            <div className='header-user'>
              <Image src={avatar} alt='avatar' width={44} height={44} className='header-user-avatar'/>

              <div className='sm:hidden lg:block'>
                <p className="subtitle-2 capitalize">{name}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className='bg-light-200/20'/>
          </SheetTitle>

          <nav className='mobile-nav'>
            <ul className='mobile-nav-list'>
              {navItems.map(({url, name, icon}) => (
                <Link key={name} href={url} className='lg:w-full'>
                  <li className={cn("mobile-nav-item", pathname === url && "shad-active")}>
                    <Image src={icon} alt={name} width={24} height={24} 
                    className={cn("nav-icon", pathname === url && "nav-icon-active")}/>
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          
          <Separator className='mt-3 bg-light-200/20'/>

          <div className='flex flex-col justify-between gap-5 mt-8'>
            {/* fileuploader */}

            <Button type='submit' className='mobile-sign-out-button'
            onClick={async () => await signOut()}>
                <Image src={logoutIconUrl} alt='logout' width={24} height={24} className='w-6'/>
                <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNav
