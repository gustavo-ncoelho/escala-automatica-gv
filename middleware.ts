import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getUser} from '@/lib/session/session';

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const user = await getUser();

    const publicPath = '/';
    const privatePaths = ['/admin', '/user'];

    if (user) {
        if (publicPath === path) {
            const url = user.cargo === 'COMANDANTE' ? '/admin' : '/user';
            return NextResponse.redirect(new URL(url, req.url));
        }
    }

    if (!user) {
        if (privatePaths.some(p => path.startsWith(p))) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}