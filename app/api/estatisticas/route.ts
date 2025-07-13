import {NextResponse} from "next/server";
import {getRankingDeAtividade} from "@/api/services/estatisticas-service";

export async function GET() {
    try {
        const ranking = await getRankingDeAtividade();
        return NextResponse.json(ranking);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
