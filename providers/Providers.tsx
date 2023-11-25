'use client'

import { ThemeProvider } from 'next-themes'
import ToastProvider from './ToastProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <StateProvider> */}
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem={true}
      >
        <ToastProvider />
        {children}
      </ThemeProvider>
      {/* </StateProvider> */}
    </>
  )
}

export default Providers
