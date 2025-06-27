import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/session/session";
import {deleteGuardaVidas, getGuardaVidasById, updateGuardaVidas} from "@/api/services/guarda-vidas-service";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const { id } = params;
        const guardaVidas = await getGuardaVidasById(id);

        return NextResponse.json(guardaVidas);

    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return NextResponse.json({ error: "Guarda-vidas não encontrado" }, { status: 404 });
        }
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const { id } = params;
        const body = await req.json();

        const guardaVidasAtualizado = await updateGuardaVidas(id, body);

        return NextResponse.json(guardaVidasAtualizado);

    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return NextResponse.json({ error: "Guarda-vidas não encontrado para atualizar" }, { status: 404 });
        }
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const { id } = params;

        await deleteGuardaVidas(id);

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
            return NextResponse.json({ error: "Guarda-vidas não encontrado para deletar" }, { status: 404 });
        }
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}