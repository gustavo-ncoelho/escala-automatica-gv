import {NextRequest, NextResponse} from "next/server";
import {deleteSolicitacao, getSolicitacaoById, updateSolicitacaoStatus} from "@/api/services/solicitacoes-service";
import {getUser} from "@/lib/session/session";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (!user) return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });

        const solicitacao = await getSolicitacaoById(params.id);

        if (user.cargo !== 'COMANDANTE' && solicitacao.guardaVidasId !== user.id) {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        return NextResponse.json(solicitacao);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const body = await req.json();
        const solicitacaoAtualizada = await updateSolicitacaoStatus(params.id, body);
        return NextResponse.json(solicitacaoAtualizada);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (!user) return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });

        if (user.cargo !== 'COMANDANTE') {
            const solicitacao = await getSolicitacaoById(params.id);
            if (solicitacao.guardaVidasId !== user?.id) {
                return NextResponse.json({ error: "Você não pode deletar a solicitação de outro usuário." }, { status: 403 });
            }
        }

        await deleteSolicitacao(params.id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}