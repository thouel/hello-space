import { NAVBAR_HEIGHT } from '@/constants'

import React from 'react'

export const metadata = {
  title: 'S-n-A Authenticate',
  description: 'Authentication page crafted with love by justobit',
}

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export default AuthLayout
