import type { NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'
import { initResult } from './types'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const { token } = await request.json()
    if (!isTokenAuthorized(token)) {
      const res = initResult()
      res.error.message = 'Not authorized'
      res.status = 401
      return Response.json(res, {
        status: res.status,
      })
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
