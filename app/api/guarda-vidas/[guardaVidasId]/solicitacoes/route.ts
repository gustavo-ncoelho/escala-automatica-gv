import { NextResponse, NextRequest } from 'next/server'
import {createSolicitacao, getSolicitacoesByGuardaVidasId} from '@/services/guarda-vidas-service'
import { TipoSolicitacao } from '@/types/solicitacao';

export async function POST(
    request: NextRequest,
    { params }: { params: { guardaVidasId: string } },
) {
    try {
        const guardaVidasId = parseInt(params.guardaVidasId)
        if (isNaN(guardaVidasId)) {
            return NextResponse.json({ error: 'ID do guarda-vidas inválido' }, { status: 400 })
        }

        const body = await request.json()
        const {
            tipo,
            motivo,
            dataOriginal,
            postoOriginal,
            dataSolicitada,
            postoSolicitado,
            colegaNaoPreferido,
        } = body

        if (!tipo || tipo !== "preferencia_posto" || tipo !== "dia_indisponivel") {
            return NextResponse.json({ error: 'Tipo de solicitação inválido ou ausente.' }, { status: 400 })
        }

        const solicitacao = await createSolicitacao(
            guardaVidasId,
            tipo.toUpperCase() as TipoSolicitacao,
            motivo,
            dataOriginal ? new Date(dataOriginal) : undefined,
            postoOriginal,
            dataSolicitada ? new Date(dataSolicitada) : undefined,
            postoSolicitado,
            colegaNaoPreferido,
        )

        return NextResponse.json(solicitacao, { status: 201 })
    } catch (error) {
        console.error('Erro ao criar solicitação:', error)
        return NextResponse.json({ error: 'Erro ao criar solicitação' }, { status: 500 })
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { guardaVidasId: string } },
) {
    try {
        const guardaVidasId = parseInt(params.guardaVidasId)
        if (isNaN(guardaVidasId)) {
            return NextResponse.json({ error: 'ID do guarda-vidas inválido' }, { status: 400 })
        }

        const solicitacoes = await getSolicitacoesByGuardaVidasId(guardaVidasId)
        return NextResponse.json(solicitacoes)
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error)
        return NextResponse.json({ error: 'Erro ao buscar solicitações' }, { status: 500 })
    }
}