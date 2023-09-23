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
                'px-4 py-2 rounded-md min-w-[120px] text-center font-medium transition-colors',
                variants === 'primary' && 'bg-primary text-white hover:bg-primary-hover',
                variants === 'secondary' && 'border border-neutral-400 text-neutral-800',
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

export function CopyToClipboard({ className, icon: baseIcon = <Clipboard size={20} />, onClick, ...props }: CopyToClipboardProps) {
    const [icon, setIcon] = useState(baseIcon)
    const classes = cn(
        'absolute transition-opacity opacity-0 p-1 bg-slate-100 rounded-md top-4 right-4 z-10 bg-neutral-200 text-neutral-600 hover:bg-neutral-300 transition-colors',
        className
    )

    const handleClick = useCallback((ev: MouseEvent<HTMLButtonElement>) => {
        onClick?.(ev);
        setIcon(<Check size={20} />);

        const timer = setTimeout(() => {
            setIcon(baseIcon);
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
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
            icon={<DownloadIcon size={20} />}
            onClick={handleClick}
            className={cn('right-12', className)}
            {...rest}
        />
    )
}