"use client"

import { searchIconUrl } from '@/constants'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Models } from 'node-appwrite'

const Searchbar = () => {
    const {push} = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<Models.Document[]>([])
    
    return (
        <div className='search'>
            <div className='search-input-wrapper'>
                <Image src={searchIconUrl} alt='search' width={24} height={24}/>
                <Input
                    placeholder='Search...'
                    className='search-input'
                    onChange={(e) => setQuery(e.target.value)}
                />

                {isOpen && (
                    <ul className='search-result'></ul>
                )}
            </div>
        </div>
    )
}

export default Searchbar
