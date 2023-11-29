export { default } from 'next-auth/middleware'

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/s'],
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
