import {RankingItem} from "@/types/guarda-vidas";
import {prisma} from "@/lib/prisma";

export async function getRankingDeAtividade(): Promise<RankingItem[]> {
    const contagemPorGv = await prisma.alocacaoDiaria.groupBy({
        by: ['guardaVidasId'],
        _count: {
            guardaVidasId: true,
        },
        orderBy: {
            _count: {
                guardaVidasId: 'desc',
            },
        },
    });

    if (contagemPorGv.length === 0) {
        return [];
    }

    const guardaVidasIds = contagemPorGv.map(item => item.guardaVidasId);

    const usuarios = await prisma.usuario.findMany({
        where: {
            perfilGuardaVidas: {
                id: {
                    in: guardaVidasIds,
                },
            },
        },
        select: {
            nome: true,
            perfilGuardaVidas: {
                select: {
                    id: true,
                },
            },
        },
    });

    return contagemPorGv.map(itemContagem => {
        const usuarioCorrespondente = usuarios.find(
            u => u.perfilGuardaVidas?.id === itemContagem.guardaVidasId
        );
        return {
            guardaVidasId: itemContagem.guardaVidasId,
            nome: usuarioCorrespondente?.nome || 'Nome não encontrado',
            diasTrabalhados: itemContagem._count.guardaVidasId,
        };
    });
}