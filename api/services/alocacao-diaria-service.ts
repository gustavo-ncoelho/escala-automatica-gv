import { prisma } from '@/lib/prisma';
import {AlocacaoDiariaCriacao} from "@/types/alocacao-diaria";
import {endOfMonth, startOfMonth } from 'date-fns';

export async function getAlocacoesPorData(dataAlvo: Date) {
    return prisma.alocacaoDiaria.findMany({
        where: {
            data: dataAlvo
        },
        include: {
            guardaVidas: {
                include: {
                    usuario: true
                }
            },
            posto: true
        }
    });
}

export async function getAlocacoesPorMes(mes: number, ano: number) {
    const inicioDoMes = startOfMonth(new Date(ano, mes - 1));
    const fimDoMes = endOfMonth(new Date(ano, mes - 1));

    return prisma.alocacaoDiaria.findMany({
        where: {
            data: {
                gte: inicioDoMes,
                lte: fimDoMes,
            }
        },
        include: {
            guardaVidas: {
                include: {
                    usuario: true
                }
            },
            posto: true
        }
    });
}

export async function getAlocacoesPorGuardaVidas(guardaVidasId: string) {
    return prisma.alocacaoDiaria.findMany({
        where: {
            guardaVidasId: guardaVidasId
        },
        include: {
            posto: true
        },
        orderBy: {
            data: 'asc'
        }
    });
}

export async function salvarEscalaDiaria(novasAlocacoes: AlocacaoDiariaCriacao[]) {
    if (novasAlocacoes.length === 0) {
        return;
    }

    const dataDaEscala = new Date(novasAlocacoes[0].data);

    return prisma.$transaction([

        prisma.alocacaoDiaria.deleteMany({
            where: { data: dataDaEscala }
        }),

        prisma.alocacaoDiaria.createMany({
            data: novasAlocacoes
        })
    ]);
}