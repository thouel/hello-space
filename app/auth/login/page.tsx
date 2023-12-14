import { log } from '@logtail/next'
import { getBaseUrl } from '@/lib/ui-helper'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import SignInProviders from '@/components/sub/SignInProviders'
import SignInError from '@/components/sub/SignInError'
import options from '@/app/api/auth/[...nextauth]/options'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession(options)
  const callbackUrl = searchParams['callbackUrl']

  if (session?.user) {
    if (callbackUrl && typeof callbackUrl === 'string') {
      redirect(`${callbackUrl}?fromLogin=1`)
    }
    redirect('/')
  }
  log.debug('before providers')
  const providers = await fetch(`${getBaseUrl()}/api/auth/providers`)
    .then((res) => {
      log.debug('in res', { res })
      return res.json()
    })
    .then((body) => {
      log.debug('in body', { body })
      return body
    })
  log.debug('providers rcvd', { providers })

  return (
    <>
      <p className='mb-2 text-center'>You choose the way you hop in</p>
      <div className='flex flex-col w-full gap-2 p-2 border border-gray-400 rounded-lg shadow-lg '>
        <SignInProviders providers={providers} />
      </div>
      <SignInError />
    </>
  )
}
