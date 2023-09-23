import { Check, Clipboard, Download as DownloadIcon } from "react-feather"
import { cn } from "./util"
import { MouseEvent, useCallback, useState } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: 'primary' | 'secondary'
    link?: boolean
}

export function Button({ variants = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'px-4 py-2 rounded-md min-w-[120px] text-center font-medium',
                variants === 'primary' && 'bg-primary text-white hover:bg-purple-900',
                variants === 'secondary' && 'border border-neutral-300 text-primary'
            )}
            {...props}
        />
    )
}

/**
 * 
 * Copy to Clipboard
 */
interface CopyToClipboardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    icon?: React.ReactNode
}

export function CopyToClipboard({ className, icon: baseIcon = <Clipboard size={18} />, onClick, ...props }: CopyToClipboardProps) {
    const [icon, setIcon] = useState(baseIcon)
    const classes = cn(
        'absolute transition-opacity opacity-0 p-1 bg-slate-100 rounded-md top-4 right-4 z-10 bg-neutral-300 text-neutral-800 ',
        className
    )

    const handleClick = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
        onClick?.(ev);
        setIcon(<Check size={18} />);

        setTimeout(() => {
            setIcon(baseIcon);
        }, 2000)
    }, [onClick])

    return (
        <button className={classes} onClick={handleClick} {...props}>
            {icon}
        </button>
    )
}

interface DownloadProps extends Omit<ButtonProps, 'onClick'> {
    content: string
    filename?: string
}

/**
 * Download button
 */
export function Download({ content, filename, className, ...rest }: DownloadProps) {
    const handleClick = useCallback(() => {
        const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'text/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename ?? 'data'}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }, [content])

    return (
        <CopyToClipboard
            icon={<DownloadIcon size={18} />}
            onClick={handleClick}
            className={cn('right-12', className)}
            {...rest}
        />
    )
}