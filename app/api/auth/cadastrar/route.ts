import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/api/services/auth-service";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newUser = await registerUser(body);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro';
        return NextResponse.json({ error: errorMessage }, { status: 409 });
    }
}