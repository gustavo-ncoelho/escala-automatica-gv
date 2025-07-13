import {NextResponse} from "next/server";
import {deleteSession} from "@/lib/session/session";

export async function POST() {
    await deleteSession();
    return NextResponse.json({ message: "Logout bem-sucedido" });
}