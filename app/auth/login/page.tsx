import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'
import SignInAndUpProviders from '@/components/sub/SignInAndUpProviders'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { log } from '@logtail/next'

export default async function LoginPage() {
  const session = await getServerSession(options)

  if (session?.user) {
    redirect('/')
  }

  const providers = await fetch('http://localhost:3000/api/auth/providers')
    .then((res) => res.json())
    .then((body) => body)
  log.debug('providers rcvd', { providers })

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='p-2 border border-gray-400 rounded-lg shadow-lg'>
          <div className='w-full'>
            <SignInAndUpProviders providers={providers} type={'signin'} />
          </div>
        </div>
        {/* <div className='divider'>OR</div>
        <button className='btn btn-primary'>
          <Link href={'/auth/signup'}>Create your account now !</Link>
        </button> */}
      </div>
    </>
  )
}
