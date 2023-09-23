import { CopyToClipboard, Download } from '@/components/button';
import Header from '@/components/header';
import { load } from 'js-yaml';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useLocal } from './use-local';

const JSONBlock = dynamic(() => import('@/components/json-block'), {
  ssr: false,
  loading: () => <div className='mx-auto mt-20'>Loading...</div>
})

export default function Home() {
  const [value, setValue] = useLocal('ymlJSON:yaml')
  const [json, setJSON] = useState('')
  const [filename, setFilename] = useState('')

  useEffect(() => {
    try {
      const parsed = load(value) as string
      setJSON(parsed)
    } catch (error) {
      console.log(error)
    }
  }, [value])

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(ev.target.value);
  }, [value])

  const handleCopy = useCallback((block: 'json' | 'yaml') => {
    if (block === "json") {
      navigator.clipboard.writeText(JSON.stringify(json, null, 2))
      return
    }
    navigator.clipboard.writeText(value)
  }, [json, value])

  return (
    <main className='h-full bg-foreground'>
      <Header navigateTarget={inputRef} setValue={setValue} setFilename={setFilename} />
      <section className='flex gap-3 flex-col lg:flex-row max-w-[1300px] mx-auto mb-9 px-7'>
        <div className='flex-1 relative group'>
          <textarea
            ref={inputRef}
            onChange={handleChange}
            value={value}
            className='rounded-md w-full p-2 whitespace-pre-wrap h-[90vh] border border-neutral-200 bg-accent-bg'
          />
          {value && (
            <CopyToClipboard
              onClick={_ => handleCopy('yaml')}
              className="group-hover:opacity-100"
            />
          )}
        </div>

        <div className='flex-1 relative group'>
          <div className={`w-full grid h-[90vh] overflow-y-auto rounded-md border border-neutral-200`}>
            <JSONBlock json={json} />
          </div>
          {json && (
            <>
              <CopyToClipboard
                onClick={_ => handleCopy('json')}
                className="group-hover:opacity-100"
              />
              <Download
                content={json}
                filename={filename}
                className='group-hover:opacity-100'
              />
            </>
          )}
        </div>
      </section>
    </main>
  )
}