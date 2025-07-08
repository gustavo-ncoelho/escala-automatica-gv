import { NextResponse } from "next/server";
import { getUser } from "@/lib/session/session";
import {getGuardaVidas} from "@/api/services/guarda-vidas-service";

export async function GET() {
    try {
        const user = await getUser();

        const guardaVidas = await getGuardaVidas();

        return NextResponse.json(guardaVidas);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro interno";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}