import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'
import SignInProviders from '@/components/sub/SignInProviders'
import { log } from '@logtail/next'
import { redirect } from 'next/navigation'
import { getCsrfToken } from 'next-auth/react'

export default async function SignupPage() {
  const session = await getServerSession(options)

  if (session?.user) {
    redirect('/')
  }

  const csrfToken = await getCsrfToken()
  const providers = await fetch('http://localhost:3000/api/auth/providers')
    .then((res) => res.json())
    .then((body) => body)

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='p-2 border border-gray-400 rounded-lg shadow-lg'>
          <form method='post' action='/api/auth/signin/email'>
            <input type='hidden' name='csrfToken' defaultValue={csrfToken} />
            <label className='form-control'>
              <div className='label'>
                <span className='label-text'>Gender?</span>
              </div>
              <select className='select select-bordered'>
                <option defaultValue={0}>Pick one</option>
                <option value={1}>Female</option>
                <option value={2}>Male</option>
                <option value={3}>Non Binary</option>
                <option value={4}>Prefer not to say</option>
                <option value={5}>Zerg</option>
              </select>
            </label>
            <div className='mt-2 form-control'>
              <div>
                <label className='label' htmlFor='firstname'>
                  <span className='label-text dark:text-gray-100'>
                    First name?
                  </span>
                </label>
              </div>
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Jack'
                className='input input-bordered dark:text-gray-100 dark:bg-gray-600'
              />
            </div>
            <div className='mt-2 form-control'>
              <div>
                <label className='label' htmlFor='lastname'>
                  <span className='label-text dark:text-gray-100'>
                    Last name?
                  </span>
                </label>
              </div>
              <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Reacher'
                className='input input-bordered dark:text-gray-100 dark:bg-gray-600'
              />
            </div>
            <div className='mt-2 form-control'>
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
            <button className='w-full mt-4 btn btn-primary'>Sign up</button>
          </form>
        </div>
        <div className='w-full'>
          <SignInProviders providers={providers} />
        </div>
      </div>
    </>
  )
}
