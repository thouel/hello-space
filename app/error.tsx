'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    // <div className='flex flex-row max-w-sm'>
    //   <h1 className='pr-6 mr-5 text-2xl font-semibold align-top border-r-2 border-solid border-r-black/30'>
    //     {error.name}
    //   </h1>
    //   <h2 className='inline-block text-sm font-medium'>{error.message}</h2>
    // </div>
    <div
      style={{
        fontFamily:
          'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h1
          className='inline-block pr-6 mr-5 text-xl font-semibold align-top border-r-2 border-solid border-r-black/30'
          /* style={{
            display: 'inline-block',
            margin: '0px 20px 0px 0px',
            padding: '0px 23px 0px 0px',
            fontSize: '24px',
            fontWeight: '500',
            verticalAlign: 'top',
            lineHeight: '49px',
          }} */
        >
          {error.name}
        </h1>
        <div className='inline-block max-w-xs'>
          <h2 className='text-sm font-normal'>{error.message}</h2>
        </div>
        <button
          className='justify-center block ml-10 font-medium align-center btn-outline'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}
