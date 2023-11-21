'use client'

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
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
        <h1 className='inline-block pr-6 mr-5 text-xl font-semibold align-top border-r-2 border-solid border-r-black/30'>
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
