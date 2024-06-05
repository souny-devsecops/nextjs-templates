
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token: any = request.cookies.get('token')
    if (token) {
        // return NextResponse.next()
        if (request.nextUrl.pathname == "/") {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    } else {
        // return NextResponse.redirect(new URL('/', request.url))
        return NextResponse.next()
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/admin/:path*'],
    // matcher: ['/admin/:path*'],
}