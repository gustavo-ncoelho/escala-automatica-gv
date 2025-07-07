import { NextRequest, NextResponse } from "next/server";
import { getPostos, createPosto } from "@/api/services/postos-service";
import { getUser } from "@/lib/session/session";

export async function GET() {
    try {
        const user = await getUser();

        const postos = await getPostos();
        return NextResponse.json(postos);

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
        const novoPosto = await createPosto(body);
        return NextResponse.json(novoPosto, { status: 201 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        if (errorMessage.includes("Já existe um posto")) {
            return NextResponse.json({ error: errorMessage }, { status: 409 });
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}