import { NextResponse } from "next/server";
import { getUser } from "@/lib/session/session";
import {obterUsuario} from "@/actions/session-actions/obter-usuario";

export async function GET() {
    try {
        const user = await obterUsuario();

        if (!user) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
}