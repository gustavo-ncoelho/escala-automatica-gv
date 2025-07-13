import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {decrypt} from '@/lib/session/session';

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        )
    }

    const decryptedSession = await decrypt(sessionCookie);

    if (!decryptedSession) {
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Authentication failed' }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        )
    }

    return NextResponse.next()
}


export const config = {
    matcher: [
        '/api/((?!auth).*)',
    ],
}