import React from 'react'

const LoginForm = () => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='p-2 border border-gray-400 rounded-lg shadow-lg'>
          <div className='form-control'>
            <div>
              <label className='label' htmlFor='email'>
                <span className='label-text dark:text-gray-100'>Email?</span>
                <span className='label-text-alt hover:underline dark:text-gray-100'>
                  Forgot email?
                </span>
              </label>
            </div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='jack.reacher@critical-hits.only'
              className='input input-bordered dark:text-gray-100 dark:bg-gray-600'
            />
          </div>
          <div className='mt-2 form-control'>
            <label className='label' htmlFor='password'>
              <span className='label-text dark:text-gray-100'>Password?</span>
              <span className='label-text-alt hover:underline dark:text-gray-100'>
                Forgot password?
              </span>
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='input input-bordered dark:text-gray-100 dark:bg-gray-600'
            />
          </div>
          <button className='w-full mt-4 btn btn-primary'>Log in</button>
        </div>
        <div className='divider'>OR</div>
        <button className='btn btn-primary'>Sign up</button>
      </div>
    </>
  )
}
export default LoginForm
