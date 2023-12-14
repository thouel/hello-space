'use client'
import { useTheme } from 'next-themes'

const ThemeMenuItem = () => {
  const { theme, setTheme } = useTheme()

  const onClickTheme = (e: any): void => {
    e.preventDefault()
    document
      .getElementById('theme')
      ?.setAttribute('checked', theme === 'dark' ? 'true' : 'false')
  }

  const handleThemeChange = (e: any): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <div className='form-control' onClick={handleThemeChange}>
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
