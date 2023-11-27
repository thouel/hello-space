'use client'

import { ThemeProvider } from 'next-themes'
import ToastProvider from './ToastProvider'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <StateProvider> */}
      <SessionProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
        >
          <ToastProvider />
          {children}
        </ThemeProvider>
      </SessionProvider>
      {/* </StateProvider> */}
    </>
  )
}

export default Providers
