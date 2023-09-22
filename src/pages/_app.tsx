import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Nav from '../components/nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Nav />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}