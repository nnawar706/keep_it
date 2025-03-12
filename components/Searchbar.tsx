"use client"

import { searchIconUrl } from '@/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './ui/input'

const Searchbar = () => {
    const {push} = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    
    return (
        <div className='search'>
            <div className='search-input-wrapper'>
                <Image src={searchIconUrl} alt='search' width={24} height={24}/>
                <Input
                    placeholder='Search...'
                    className='search-input'
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Searchbar
