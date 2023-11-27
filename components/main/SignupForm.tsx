import Image from 'next/image'
import React from 'react'

const SignupForm = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-row w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl'>
          <div className='relative w-80'>
            <Image
              src={'/milky_way_771_1080.jpg'}
              alt='not found'
              fill
              sizes='(max-width: 768px) 100vw, 700px'
              priority
            />
          </div>
          <div className='grow'>
            <div className='flex flex-col gap-5 p-5 border rounded-lg shadow-lg'>
              <div className='form-control'>
                <label className='label' htmlFor='email'>
                  <span className='label-text'>What is your email?</span>
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='jack.reacher@critical-hits.only'
                  className='input input-bordered'
                />
              </div>
              <div className='form-control'>
                <label className='label' htmlFor='password'>
                  <span className='label-text'>What is your password?</span>
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='input input-bordered'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupForm
