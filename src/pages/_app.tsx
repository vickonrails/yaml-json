import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Nav from '../components/nav';
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Nav />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}