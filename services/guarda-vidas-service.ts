import { prisma } from '@/lib/prisma'
import {AlocacaoDiaria, EscalaMensal} from "@/types/alocacao-diaria";
import {Solicitacao, TipoSolicitacao} from "@/types/solicitacao";

export async function getAlocacoesDiariasByGuardaVidasId(
    guardaVidasId: number,
    data?: Date,
): Promise<AlocacaoDiaria[]> {
    const whereClause: any = { guardaVidasId: guardaVidasId }
    if (data) {
        whereClause.data = {
            gte: new Date(data.setHours(0, 0, 0, 0)),
            lt: new Date(data.setHours(23, 59, 59, 999)),
        }
    }

    const alocacoes = await prisma.alocacaoDiaria.findMany({
        where: whereClause,
        include: {
            posto: true,
        },
        orderBy: {
            data: 'desc',
        },
    })
    return alocacoes
}

export async function getEscalaMensalByGuardaVidasId(
    guardaVidasId: number,
    mes: number,
    ano: number,
): Promise<EscalaMensal | null> {
    // Encontra a escala mensal
    const escala = await prisma.escalaMensal.findUnique({
        where: {
            mes_ano: {
                mes: mes,
                ano: ano,
            },
        },
    })

    if (!escala) {
        return null
    }

    // Encontra as alocações diárias específicas para este guarda-vidas e esta escala
    const alocacoes = await prisma.alocacaoDiaria.findMany({
        where: {
            guardaVidasId: guardaVidasId,
            AND: [
                {
                    data: {
                        gte: new Date(ano, mes - 1, 1), // Começo do mês
                    },
                },
                {
                    data: {
                        lt: new Date(ano, mes, 1), // Início do próximo mês
                    },
                },
            ],
            escalaMensalId: escala.id, // Filtra pela escala mensal encontrada
        },
        include: {
            posto: true,
        },
        orderBy: {
            data: 'asc',
        },
    })

    // Retorna a escala com as alocações filtradas
    return { ...escala, alocacoes: alocacoes }
}

export async function createSolicitacao(
    guardaVidasId: number,
    tipo: TipoSolicitacao,
    motivo?: string,
    dataOriginal?: Date,
    postoOriginal?: number,
    dataSolicitada?: Date,
    postoSolicitado?: number,
    colegaNaoPreferido?: number,
): Promise<Solicitacao> {
    const solicitacao = await prisma.solicitacao.create({
        data: {
            guardaVidasId,
            tipo,
            motivo,
            dataOriginal,
            postoOriginal,
            dataSolicitada,
            postoSolicitado,
            colegaNaoPreferido,
            status: "pendente"
        },
    })
    return solicitacao
}

export async function getSolicitacoesByGuardaVidasId(
    guardaVidasId: number,
): Promise<Solicitacao[]> {
    const solicitacoes = await prisma.solicitacao.findMany({
        where: { guardaVidasId: guardaVidasId },
        orderBy: { dataCriacao: 'desc' },
    })
    return solicitacoes
}