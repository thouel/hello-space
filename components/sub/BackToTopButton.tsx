'use client'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])
  return (
    <div className='fixed bottom-2 right-2'>
      <button
        type='button'
        onClick={scrollToTop}
        className={`${
          isVisible ? 'opacity-100' : 'opacity-0'
        } bg-white hover:bg-black hover:text-white focus:ring-black dark:focus:ring-white inline-flex items-center rounded-full p-3 text-black dark:text-black hover:dark:text-white shadow-sm transition-opacity focus:outline-none focus:ring-2`}
      >
        <ArrowUpCircleIcon className='w-10 h-10' aria-hidden='true' />
      </button>
    </div>
  )
}

export default BackToTopButton
