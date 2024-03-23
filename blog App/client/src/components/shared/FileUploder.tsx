import React, { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploderProps = {
    fieldChange: (FILES: File[]) => void,
    mediaUrl: string
}

const FileUploder = ({ fieldChange, mediaUrl }: FileUploderProps) => {
    const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
    const [file, setFile] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        console.log(acceptedFiles, "accept file");

        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.svg'] } })

    return (
        <div className='flex justify-center items-center flex-col bg-dark-3 rounded-xl cursor-pointer border-3' {...getRootProps()} >
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ?
                    <>
                        <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                            <img src={fileUrl} alt="image" className='h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top' />

                        </div>
                        <p className='text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4'>Click or Drage Photo to replace </p>
                    </>
                    :
                    <div className='flex justify-center items-center flex-col p-7 h-80 lg:h-[612px] '>
                        <img src="/images/add-post.svg" alt="upload file" width={96} height={77} />
                        <h3 className='base-light text-light-2 mb-2 mt-6'>Drag Photo here </h3>
                        <p className='text-light-4 small-reguler mb-6'>SVG,PNG,JPG</p>
                        <Button  type='button'>Select from your device</Button>
                    </div>
            }
        </div>
    )
}

export default FileUploder