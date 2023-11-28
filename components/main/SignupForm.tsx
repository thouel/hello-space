import React from 'react'

const SignupForm = () => {
  return (
    <>
      <div className='flex flex-col gap-5 p-5 mx-2 border rounded-lg shadow-lg'>
        <div className='form-control'>
          <div>
            <label className='label' htmlFor='email'>
              <span className='label-text'>Email?</span>
            </label>
          </div>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='jack.reacher@critical-hits.only'
            className='input input-bordered'
          />
          <div className='label'>
            <span className='label-text-alt'></span>
            <span className='label-text-alt'>Forgot email?</span>
          </div>
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='password'>
            <span className='label-text'>Password?</span>
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='input input-bordered'
          />
          <div className='label'>
            <span className='label-text-alt'></span>
            <span className='label-text-alt'>Forgot password?</span>
          </div>
          <div className='label'>
            <span className='label-text-alt'>Sign up</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupForm
