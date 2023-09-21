import "highlight.js/styles/night-owl.css";
import { load } from 'js-yaml';
import { ChangeEvent, useEffect, useState } from 'react';
import Highlighter from 'react-syntax-highlighter';
import { useLocal } from './use-local';

export default function Home() {
  const [json, setJSON] = useState('')
  const { value: yml, update: setYml } = useLocal('ymlJSON:yaml')

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setYml(ev.target.value);
  }

  useEffect(() => {
    try {
      const parsed = load(yml) as string
      setJSON(parsed)
    } catch (error) {
      console.log(error)
    }
  }, [yml])

  return (
    <main className='h-full px-4'>
      <header className='max-w-lg mx-auto mb-6 mt-10'>
        <h1 className='text-3xl text-center mb-2'>YAML to JSON converter</h1>
        <p className='text-center'>
          Upload a YAML file, get an editable JSON file that
          you can copy or download to your computer. Or better still,
          paste the contents of the YAML file to convert to JSON
        </p>
      </header>
      <section className='flex gap-3 max-w-[1300px] mx-auto'>
        <div className='flex-1'>
          <textarea
            onChange={handleChange}
            value={yml}
            className='border rounded-md w-full p-2 bg-slate-100 whitespace-pre-wrap h-96'
          />
        </div>

        <div className='flex-1 h-96 overflow-y-auto'>
          <div className='w-full border h-full rounded-md'>
            <Highlighter language='json'>
              {JSON.stringify(json, null, 2)}
            </Highlighter>
          </div>
        </div>
      </section>
    </main>
  )
}
