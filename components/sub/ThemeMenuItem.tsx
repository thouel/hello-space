'use client'
import { useTheme } from 'next-themes'
import React, { ChangeEvent } from 'react'

const ThemeMenuItem = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <div className='form-control'>
        <input
          type='checkbox'
          className='toggle toggle-xs'
          onChange={handleThemeChange}
          checked={theme === 'dark'}
          name='theme'
          id='theme'
        />
      </div>
      <label htmlFor='theme'>Switch theme</label>
    </>
  )
}

export default ThemeMenuItem
