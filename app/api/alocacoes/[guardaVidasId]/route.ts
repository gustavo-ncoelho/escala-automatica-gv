import { NextRequest, NextResponse } from "next/server";
import { getAlocacoesPorGuardaVidas } from "@/api/services/alocacao-diaria-service";
import { getUser } from "@/lib/session/session";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { guardaVidasId: string } }) {
    try {
        const user = await getUser();
        const { guardaVidasId } = params;

        const alocacoes = await getAlocacoesPorGuardaVidas(guardaVidasId);

        return NextResponse.json(alocacoes);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}