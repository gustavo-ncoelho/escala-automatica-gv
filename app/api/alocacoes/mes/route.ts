import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/session/session";
import {getAlocacoesPorMes} from "@/api/services/alocacao-diaria-service";

export async function GET(req: NextRequest) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
        }

        const ano = req.nextUrl.searchParams.get('ano');
        const mes = req.nextUrl.searchParams.get('mes');

        if (!ano || !mes) {
            return NextResponse.json({ error: "Parâmetros 'ano' e 'mes' são obrigatórios" }, { status: 400 });
        }

        const alocacoes = await getAlocacoesPorMes(Number(mes), Number(ano));

        return NextResponse.json(alocacoes);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}