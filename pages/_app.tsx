import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";

import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">

        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App