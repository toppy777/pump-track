import { auth } from '@/features/auth/config'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export default auth((req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== '/' &&
    req.nextUrl.pathname !== '/about'
  ) {
    return Response.redirect(req.nextUrl.origin)
  }

  if (req.auth && req.nextUrl.pathname === '/') {
    return Response.redirect(req.nextUrl.origin + '/trainings')
  }
})
