import { NextResponse, type NextRequest } from 'next/server'
import { isTokenAuthorized } from './lib/ui-helper'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const { token } = await request.json()
    // We do not throw an exception from there because it would
    // fail the response preparation in the fetch().then().then()
    // sequence. Instead we build a correct json response
    if (!isTokenAuthorized(token)) {
      const res = { message: 'Not authorized' }
      return NextResponse.json(res, { status: 401 })
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
