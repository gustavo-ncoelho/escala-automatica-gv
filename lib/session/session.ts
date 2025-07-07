'use server'

import 'server-only'
import { jwtVerify, SignJWT } from 'jose'
import { SessionPayload } from "@/types/auth/session-payload";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { isServer } from "@/lib/utils";
import {Usuario} from "@prisma/client";
import {UsuarioPayload} from "@/types/auth/usuario";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function generateTokens(user: UsuarioPayload) {
    const authorizationToken = await new SignJWT({
        id: user.id,
        email: user.email,
        nome: user.nome,
        cargo: user.cargo
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(encodedKey);

    const refreshToken = await new SignJWT({
        id: user.id
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);

    return { authorizationToken, refreshToken };
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | undefined> {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })

        return payload as SessionPayload
    } catch (error) {
        console.error(`Failed to verify session: ${error}`)
    }
}

export async function createSession({authorizationToken, refreshToken}: {
    authorizationToken: string,
    refreshToken: string,
}) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({
        authorizationToken: authorizationToken,
        refreshToken: refreshToken,
    })

    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
        secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession(): Promise<SessionPayload | undefined> {
    if (isServer()) {
        const cookieStore = await cookies()
        const session = cookieStore.get("session")?.value

        if (!session) return

        return await decrypt(session)
    } else {
        const cookies = document.cookie.split(";").reduce(
            (acc, cookie) => {
                const [key, value] = cookie.trim().split("=")
                acc[key] = value
                return acc
            },
            {} as Record<string, string>,
        )

        const session = cookies["session"]

        if (!session) return

        return await decrypt(session)
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getUser(): Promise<UsuarioPayload | undefined> {
    const session = await getSession();

    if (!session) return

    return jwtDecode(session.authorizationToken) as UsuarioPayload
}