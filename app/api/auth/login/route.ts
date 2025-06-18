import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {createSession, generateTokens} from "@/lib/session/session";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, senha } = body;

        const user = await prisma.guarda_vidas.findUnique({
            where: { email: email }
        });

        if (!user) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha_hash);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
        }

        const { authorizationToken, refreshToken } = await generateTokens(user);

        await createSession({ authorizationToken, refreshToken });

        return NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}