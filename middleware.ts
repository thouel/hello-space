import { NextResponse, type NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'
import { log } from '@logtail/next'

export async function middleware(request: NextRequest) {
  log.debug('in middleware', { pathname: request.nextUrl.pathname })
  if (request.nextUrl.pathname.startsWith('/api')) {
    log.debug('in middleware, getting token from request', { request })
    const { token } = await request.json()
    log.debug('in middleware, checking token', token)
    // We do not throw an exception from there because it would
    // fail the response preparation in the fetch().then().then()
    // sequence. Instead we build a correct json response
    if (!isTokenAuthorized(token)) {
      log.debug('in middleware, exiting with 401')
      const res = { message: 'Not authorized' }
      return NextResponse.json(res, { status: 401 })
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
