import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import { getCurrentUser } from '@/lib/actions/user.actions'
import { LayoutInterface } from '@/types'
import { redirect } from 'next/navigation';
import React from 'react'

const RootLayout = async ({ children }: LayoutInterface) => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) return redirect('/sign-in');
  
    return (
        <div className="flex h-screen">
            <Sidebar {...currentUser}/>

            <div className="flex h-full flex-1 flex-col">
            
                <MobileNav {...currentUser} />
                <Header userId={currentUser.$id} accountId={currentUser.accountId}/>
                <div className='main-content'>{children}</div>
            </div>
        </div>
    )
}

export default RootLayout
