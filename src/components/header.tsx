import React, { useCallback } from 'react'
import { Button } from './button'
import { UploadButton } from './upload-button'

interface HeaderProps {
    setValue: (value: string) => void
    navigateTarget: React.RefObject<HTMLTextAreaElement>
    setFilename: (filename: string) => void
}

const Header = ({ setValue, setFilename, navigateTarget }: HeaderProps) => {
    const onFilePicked = useCallback((content: string, filename: string) => {
        setFilename(filename)
        setValue(content)
    }, [setValue, setFilename]);

    const navigateToInput = useCallback(() => {
        const input = navigateTarget.current;
        input?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            input?.focus();
        }, 500)
    }, [])

    return (
        <header className='max-w-md mx-auto mb-6 pt-20 pb-10'>
            <h1 className='text-5xl font-bold text-center mb-4'>YAML to JSON converter</h1>
            <p className='text-center text-lg'>
                Paste or upload a YAML file, get a JSON file that
                you can copy or download to your computer.
            </p>

            <div className="flex justify-center py-4 gap-3">
                <UploadButton onFilePicked={onFilePicked}>Upload</UploadButton>
                <Button onClick={navigateToInput} variants="secondary">Paste</Button>
            </div>
        </header>
    )
}

export default Header