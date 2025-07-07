import { NextRequest, NextResponse } from "next/server";
import { getSolicitacoes, createSolicitacao } from "@/api/services/solicitacoes-service";
import { getUser } from "@/lib/session/session";

export async function GET() {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const solicitacoes = await getSolicitacoes();
        return NextResponse.json(solicitacoes);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getUser();
        if (!user || user.cargo === "COMANDANTE") {
            return NextResponse.json({ error: "Acesso não autorizado para criar solicitação" }, { status: 403 });
        }

        const body = await req.json();

        const novaSolicitacao = await createSolicitacao(body);
        return NextResponse.json(novaSolicitacao, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}