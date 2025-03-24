import { auth } from "@/features/auth/config"
import { NextRequest } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
 
export default auth((req: NextRequest) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    return Response.redirect(req.nextUrl.origin)
  }
})