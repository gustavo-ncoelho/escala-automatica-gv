'use server'

import {serverAction} from '@/actions/server-action'
import {getSession} from '@/lib/session/session'
import {ServerActionError} from '@/lib/errors/errors'

export const obterSessao = serverAction(async () => {
    const session = await getSession()

    if (!session) {
        throw new ServerActionError('Sessão não encontrada.')
    }

    return session
})