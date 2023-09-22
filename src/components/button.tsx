import { Clipboard, Download as DownloadIcon } from "react-feather"
import { cn } from "./util"
import { useCallback } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: 'primary' | 'secondary'
    link?: boolean
}

export function Button({ variants = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'px-4 py-2 rounded-md min-w-[120px] text-center font-medium',
                variants === 'primary' && 'bg-primary text-white',
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
export function CopyToClipboard({ className, icon, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }) {
    const classes = cn(
        'absolute transition-opacity opacity-0 border p-1 bg-slate-100 rounded-md top-4 right-4 z-10',
        className
    )

    return (
        <button className={classes}  {...props}>
            {icon ?? <Clipboard size={18} />}
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
        link.dispatchEvent(new MouseEvent('click'));
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