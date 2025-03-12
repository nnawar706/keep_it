"use client"

import { faviconUrl, logoIconUrl, navItems } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='sidebar'>
      <Link href={'/'}>
        <Image src={logoIconUrl} alt='logo' width={360} height={100} 
        className='hidden h-auto lg:block'/>
        <Image src={faviconUrl} alt='favicon' width={160} height={40} 
        className='lg:hidden'/>
      </Link>

      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({url, name, icon}) => (
            <Link key={name} href={url} className='lg:w-full'>
              <li className={cn("sidebar-nav-item", pathname === url && 'shad-active')}>
                <Image src={icon} alt={name} width={20} height={20}
                className={cn("nav-icon", pathname === url && "nav-icon-active")}/>
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
