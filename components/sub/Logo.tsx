import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href='/' className={className}>
      <Image
        src={'/sna.jpg'}
        width={70}
        height={70}
        alt={'logo'}
        className='inline'
      />
      Home
    </Link>
  )
}

export default Logo
