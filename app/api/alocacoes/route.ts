import {NextRequest, NextResponse} from "next/server";
import {getAlocacoesPorData, salvarEscalaDiaria} from "@/api/services/alocacao-diaria-service";
import {getUser} from "@/lib/session/session";
import {parse} from 'date-fns';

export async function GET(req: NextRequest) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
        }

        const dateString = req.nextUrl.searchParams.get('date');
        if (!dateString) {
            return NextResponse.json({ error: "Parâmetro 'date' é obrigatório" }, { status: 400 });
        }

        const dataAlvo = parse(dateString, 'yyyy-MM-dd', new Date());
        const alocacoes = await getAlocacoesPorData(dataAlvo);

        return NextResponse.json(alocacoes);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const body = await req.json();
        await salvarEscalaDiaria(body);

        return NextResponse.json({ message: "Escala salva com sucesso" }, { status: 201 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}