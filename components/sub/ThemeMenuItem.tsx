'use client'
import { useTheme } from 'next-themes'

const ThemeMenuItem = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (e: any): void => {
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
      <label htmlFor='theme' onClick={handleThemeChange}>
        Switch theme
      </label>
    </>
  )
}

export default ThemeMenuItem
