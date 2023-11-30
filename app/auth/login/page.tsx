import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'
import SignInProviders from '@/components/sub/SignInProviders'
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
      <p className='mb-2 text-center'>You choose the way you hop in</p>
      <div className='flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg shadow-lg'>
        <SignInProviders providers={providers} />
        {/* <div className='divider'>OR</div>
        <button className='btn btn-primary'>
          <Link href={'/auth/signup'}>Create your account now !</Link>
        </button> */}
      </div>
    </>
  )
}
