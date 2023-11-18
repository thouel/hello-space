import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'
import { Result, initResult } from './types'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const { token } = await request.json()
    if (!isTokenAuthorized(token)) {
      const res: Result = initResult()
      res.error.message = 'Not authorized'
      return NextResponse.json(res, { status: 401 })
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
