"use client"

import { FileUploadProps } from '@/types'
import Image from "next/image"
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn, getFileType } from '@/lib/utils'
import { uploadIconUrl } from '@/constants'

const FileUploader = ({userId, accountId, className}: FileUploadProps) => {
    const path = usePathname();
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {}, [])
    
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button type='button' className={cn("uploader-button", className)}>
                <Image src={uploadIconUrl} alt="upload" width={24} height={24} />
                {" "}<p>Upload</p>
            </Button>
            {files.length > 0 && (
                <ul className='uploader-preview-list'>
                    <h4 className='h4 text-light-100'>Uploading</h4>

                    {files.map((file, index) => {
                        const {type, extension} = getFileType(file.name);

                        return (
                            <li key={index} className='uploader-preview-item'>
                                <div className='flex items-center gap-3'></div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    )
}

export default FileUploader
