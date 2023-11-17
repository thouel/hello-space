import Link from 'next/link'
import React from 'react'

interface Props {
  url: string
  text: string
  button: string
}

const Redirect = ({ url, text, button }: Props) => {
  return (
    <div className='space-x-2'>
      <span className='text-xs'>{text}</span>
      <Link href={url} className='text-xs font-bold'>
        {button}
      </Link>
    </div>
  )
}

export default Redirect
