'use server'

import {serverAction} from '@/actions/server-action'
import {getUser} from '@/lib/session/session'
import {ServerActionError} from '@/lib/errors/errors'

export const obterUsuario = serverAction(async () => {
    const usuario = await getUser();

    if (!usuario) {
        throw new ServerActionError('Usuário não encontrado')
    }

    return usuario;
})