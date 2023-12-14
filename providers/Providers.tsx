'use client'

import { ThemeProvider } from '@/providers/ThemeProvider'
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
          enableSystem
          disableTransitionOnChange
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
