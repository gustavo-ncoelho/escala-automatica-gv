import {prisma} from '@/lib/prisma';
import {GuardaVidasCriacao} from "@/types/guarda-vidas";

const userSelection = {
    id: true,
    email: true,
    nome: true,
    telefone: true,
    cargo: true,
    dataCriacao: true,
    dataAtualizacao: true,
    perfilGuardaVidas: {
        include: {
            preferenciasPostos: true,
            diasIndisponiveis: true
        }
    }
};

export async function getGuardaVidas() {
    return prisma.usuario.findMany({
        where: {
            cargo: 'GUARDA_VIDAS'
        },
        select: userSelection
    });
}

export async function getGuardaVidasById(id: string) {
    return prisma.usuario.findUniqueOrThrow({
        where: { id },
        select: userSelection
    });
}

export async function updateGuardaVidas(id: string, data: GuardaVidasCriacao) {
    return prisma.usuario.update({
        where: { id },
        data: {
            perfilGuardaVidas: {
                update: {
                    dataAdmissao: data.dataAdmissao,
                    diasDeFolga: data.diasDeFolga,
                    preferenciasPostos: {
                        deleteMany: {},
                        create: data.preferenciasPostos?.map(p => ({
                            prioridade: p.prioridade,
                            justificativa: p.justificativa,
                            posto: { connect: { id: p.postoId } }
                        }))
                    },
                    diasIndisponiveis: {
                        deleteMany: {},
                        create: data.diasIndisponiveis?.map(d => ({
                            data: d.data,
                            motivo: d.motivo
                        }))
                    }
                }
            }
        }
    });
}

export async function deleteGuardaVidas(id: string) {
    return prisma.usuario.delete({
        where: { id },
    });
}