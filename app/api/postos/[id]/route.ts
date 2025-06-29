import { NextRequest, NextResponse } from "next/server";
import {updatePosto, deletePosto, getPostoById} from "@/api/services/postos-service";
import { getUser } from "@/lib/session/session";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (user?.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const { id } = params;
        const body = await req.json();
        const postoAtualizado = await updatePosto(id, body);
        return NextResponse.json(postoAtualizado);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUser();
        if (!user || user.cargo !== 'COMANDANTE') {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 403 });
        }

        const { id } = params;
        const posto = await getPostoById(id);

        return NextResponse.json(posto);

    } catch (error) {
        if (error instanceof Error && error.name.includes('NotFound')) {
            return NextResponse.json({ error: "Posto não encontrado" }, { status: 404 });
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
        await deletePosto(id);
        return new NextResponse(null, { status: 204 }); // 204 No Content

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}