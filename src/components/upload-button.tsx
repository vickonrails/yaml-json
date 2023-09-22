import { ChangeEvent, useCallback, useRef } from "react"
import { Button, ButtonProps } from "./button"

interface UploadButtonProps extends Omit<ButtonProps, 'onChange' | 'onClick'> {
    onFilePicked?: (content: string) => void
}

export function UploadButton({ onFilePicked, ...rest }: UploadButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const onChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
            const text = reader.result as string
            onFilePicked?.(text);
        }
    }, [onFilePicked])

    const handleClick = useCallback(() => {
        inputRef.current?.click();
    }, [])

    return (
        <>
            <input
                type='file'
                ref={inputRef}
                onChange={onChange}
                accept=".yaml"
                className='hidden'
            />
            <Button onClick={handleClick} {...rest} />
        </>
    )

}