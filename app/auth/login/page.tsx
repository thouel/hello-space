import { auth } from '@/auth'
import LoginForm from '@/components/main/LoginForm'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <>
      <LoginForm />
    </>
  )
}
