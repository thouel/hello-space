'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.warning('TODO: login')
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='form-control'>
        <label className='label' htmlFor='email'>
          <span className='label-text text-stone-600'>Email</span>
        </label>
        <input
          type='email'
          id='email'
          className='w-full max-w-xs input input-bordered'
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className='form-control'>
        <label className='label' htmlFor='password'>
          <span className='label-text text-stone-600'>Password</span>
        </label>
        <input
          type='password'
          id='password'
          className='w-full max-w-xs input input-bordered'
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div className='mt-6 form-control'>
        <button type='submit' className='btn btn-primary'>
          Sign in
        </button>
      </div>
    </form>
  )
}

export default Signin
