import clsx from "clsx"
import { Clipboard } from "react-feather"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: 'primary' | 'secondary'
    link?: boolean
}

export function Button({ variants = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={clsx(
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
export function CopyToClipboard({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const classes = clsx(
        'absolute transition-opacity opacity-0 border p-1 bg-slate-100 rounded-md top-4 right-4 z-10',
        className
    )

    return (
        <button className={classes}  {...props}>
            <Clipboard />
        </button>
    )
}