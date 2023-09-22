import clsx from 'clsx';
import { load } from 'js-yaml';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Clipboard } from 'react-feather';
import { useLocal } from './use-local';

const JSONBlock = dynamic(() => import('@/components/json-block'), { ssr: false, loading: () => <div>Loading...</div> })

export default function Home() {
  const [value, setValue] = useLocal('ymlJSON:yaml')
  const { theme } = useTheme()
  const [json, setJSON] = useState('');
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(ev.target.value);
  }

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    try {
      const parsed = load(value) as string
      setJSON(parsed)
    } catch (error) {
      console.log(error)
    }
  }, [value])

  const handleCopy = (block: 'json' | 'yaml') => {
    if (block === "json") {
      navigator.clipboard.writeText(JSON.stringify(json, null, 2))
      return
    }
    navigator.clipboard.writeText(value)
  }

  const navigateToInput = useCallback(() => {
    const input = inputRef.current;
    input?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      input?.focus();
    }, 500)
  }, [])

  return (
    <main className='h-full bg-foreground'>
      <header className='max-w-md mx-auto mb-6 pt-20 pb-10'>
        <h1 className='text-5xl font-bold text-center mb-4'>YAML to JSON converter</h1>
        <p className='text-center text-lg'>
          Paste or upload a YAML file, get a JSON file that
          you can copy or download to your computer.
        </p>

        <div className="flex justify-center py-4 gap-3">
          <input type='file' onChange={ev => console.log(ev)} />
          <Button>Upload</Button>
          <Button onClick={navigateToInput} variants="secondary">Paste</Button>
        </div>
      </header>
      <section className='flex gap-3 max-w-[1300px] mx-auto mb-9'>
        <div className='flex-1 relative group'>
          <textarea
            ref={inputRef}
            onChange={handleChange}
            value={value}
            className='rounded-md w-full p-2 whitespace-pre-wrap h-[90vh]'
          />
          <CopyToClipboard onClick={_ => handleCopy('yaml')} className="group-hover:opacity-100" />
        </div>

        <div className='flex-1 relative group'>
          <div className='w-full h-[90vh] overflow-y-auto rounded-md '>
            <JSONBlock json={json} />
          </div>
          <CopyToClipboard onClick={_ => handleCopy('json')} className="group-hover:opacity-100" />
        </div>
      </section>
    </main>
  )
}

function CopyToClipboard({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = clsx('absolute transition-opacity opacity-0 border p-1 bg-slate-100 rounded-md top-4 right-4 z-10', className)
  return (
    <button className={classes}  {...props}>
      <Clipboard />
    </button>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variants?: 'primary' | 'secondary'
  link?: boolean
}

function Button({ variants = 'primary', ...props }: ButtonProps) {
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

export function Logo() {
  return (
    <div className="flex gap-1 items-center py-1">
      <span className="bg-neutral-900 text-neutral-100 rounded-md py-1 px-2">YAML</span>
      <span className="text-neutral-900">JSON</span>
    </div>
  )
}