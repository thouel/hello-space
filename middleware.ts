import { NextResponse, type NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'

export async function middleware(request: NextRequest) {
  console.log('in middleware', request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log('in middleware, getting token from request', { request })
    const { token } = await request.json()
    console.log('in middleware, checking token', token)
    // We do not throw an exception from there because it would
    // fail the response preparation in the fetch().then().then()
    // sequence. Instead we build a correct json response
    if (!isTokenAuthorized(token)) {
      console.log('in middleware, exiting with 401')
      const res = { message: 'Not authorized' }
      return NextResponse.json(res, { status: 401 })
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
