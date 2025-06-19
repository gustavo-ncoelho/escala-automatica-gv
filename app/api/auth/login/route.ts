import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/services/auth-service";
import { createSession } from "@/lib/session/session";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { authorizationToken, refreshToken } = await loginUser(body);

        await createSession({ authorizationToken, refreshToken });

        return NextResponse.json({ message: "Login bem-sucedido" });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro';
        return NextResponse.json({ error: errorMessage }, { status: 401 }); // 401 Unauthorized
    }
}