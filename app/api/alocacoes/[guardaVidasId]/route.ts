import { NextRequest, NextResponse } from "next/server";
import { getAlocacoesPorGuardaVidas } from "@/api/services/alocacao-diaria-service";
import { getUser } from "@/lib/session/session";

export async function GET(req: NextRequest, { params }: { params: { guardaVidasId: string } }) {
    try {
        const user = await getUser();
        const { guardaVidasId } = params;

        if (!user || (user.cargo !== 'COMANDANTE' && user.id !== guardaVidasId)) {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const alocacoes = await getAlocacoesPorGuardaVidas(guardaVidasId);

        return NextResponse.json(alocacoes);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}