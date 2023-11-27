import { auth } from '@/auth'
import SignupForm from '@/components/main/SignupForm'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return <SignupForm />
}
