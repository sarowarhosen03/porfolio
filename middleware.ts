import { NextAuthRequest } from 'next-auth'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

export default auth(async function middleware(req: NextAuthRequest) {
  if (!req?.auth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*'], // Match /dashboard and all subpaths
}
