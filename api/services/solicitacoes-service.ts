import {prisma} from '@/lib/prisma';
import {StatusSolicitacao} from "@prisma/client";
import {SolicitacaoCriacao} from "@/types/solicitacao";

export type UpdateSolicitacaoData = {
    status: StatusSolicitacao;
}

export async function getSolicitacoes() {
    return prisma.solicitacao.findMany({
        orderBy: {
            dataCriacao: 'desc'
        },
        include: {
            guardaVidas: {
                include: {
                    usuario: {
                        select: { nome: true }
                    }
                }
            }
        }
    });
}

export async function getSolicitacoesByGuardaVidas(guardaVidasId: string) {
    return prisma.solicitacao.findMany({
        where: {
            guardaVidasId: guardaVidasId,
        },
        orderBy: {
            dataCriacao: 'desc'
        }
    });
}

export async function getSolicitacaoById(id: string) {
    return prisma.solicitacao.findUniqueOrThrow({
        where: { id },
        include: {
            guardaVidas: {
                include: {
                    usuario: true
                }
            }
        }
    });
}

export async function createSolicitacao(data: SolicitacaoCriacao) {
    return prisma.solicitacao.create({
        data: {
            ...data,
            status: 'PENDENTE'
        }
    });
}

export async function updateSolicitacaoStatus(id: string, data: UpdateSolicitacaoData) {
    return prisma.solicitacao.update({
        where: { id },
        data: {
            status: data.status
        }
    });
}

export async function deleteSolicitacao(id: string) {
    return prisma.solicitacao.delete({
        where: { id },
    });
}