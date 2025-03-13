import { HeaderProps } from '@/types'
import React from 'react'
import Searchbar from './Searchbar'
import { Button } from './ui/button'
import Image from 'next/image'
import { logoutIconUrl } from '@/constants'
import { signOut } from '@/lib/actions/user.actions'
import FileUploader from './FileUploader'

const Header = ({userId, accountId}: HeaderProps) => {
    return (
        <header className='header'>
            <Searchbar/>
            <div className='header-wrapper'>
                <FileUploader userId={userId} accountId={accountId}/>
                
                <form action={async () => {
                    "use server";

                    await signOut();
                }}>
                    <Button type='submit' className='sign-out-button'>
                        <Image src={logoutIconUrl} alt='logout' width={24} height={24} className='w-6'/>
                    </Button>
                </form>
            </div>
        </header>
    )
}

export default Header
