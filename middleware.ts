import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'
import { Result, initResult } from './types'
import { NextURL } from 'next/dist/server/web/next-url'

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
