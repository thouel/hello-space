import React from 'react'

const WidthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full max-w-6xl px-4 mx-auto sm:px-6 lg:px-8'>
      {children}
    </div>
  )
}

export default WidthContainer
