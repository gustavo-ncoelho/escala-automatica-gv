'use server'

import { serverAction } from "@/actions/server-action";
import {deleteSession} from "@/lib/session/session";

export const encerrarSessao = serverAction(async () => {
    await deleteSession();
});