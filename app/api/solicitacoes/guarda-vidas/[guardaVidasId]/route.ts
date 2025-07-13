import {NextRequest, NextResponse} from "next/server";
import {getSolicitacoesByGuardaVidas} from "@/api/services/solicitacoes-service";
import {getUser} from "@/lib/session/session";

export async function GET(req: NextRequest, { params }: { params: { guardaVidasId: string } }) {
    try {
        const user = await getUser();
        const { guardaVidasId } = params;

        const solicitacoes = await getSolicitacoesByGuardaVidas(guardaVidasId);

        return NextResponse.json(solicitacoes);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
