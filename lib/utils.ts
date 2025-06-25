import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import {isSameDay} from "date-fns";
import {DiaDaSemana, GuardaVidas, GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import {v4 as uuid} from "uuid";
import {guardaVidasMock, postosMock} from "@/utils/dados-simulados";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isServer(): boolean {
    return typeof window == "undefined";
}

export function isClient(): boolean {
    return typeof window !== "undefined";
}

export const parseDateStringLocal = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};


export const getNomeMes = (mes: number) => {
    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ]
    return meses[mes - 1]
}

const getDiasNoMes = (mes: number, ano: number) => {
    return new Date(ano, mes, 0).getDate()
}

const mes = 3;          // TODO -> MOCADO
const ano = 2026;       // TODO -> MOCADO

export const contarGuardaVidasPorDia = (targetDate: Date, alocacoes: AlocacaoDiaria[]): number => {
    if (!targetDate || !alocacoes) {
        return 0;
    }

    const alocacoesDoDia = alocacoes.filter(alocacao =>
        isSameDay(alocacao.data, targetDate)
    );

    return alocacoesDoDia.length;
}

export const filtrarAlocacoesPorMes = (mes: number, ano: number, todasAsAlocacoes: AlocacaoDiaria[]): AlocacaoDiaria[] => {
    return todasAsAlocacoes.filter(alocacao => {
        const dataDaAlocacao = new Date(alocacao.data);

        const mesmoAno = dataDaAlocacao.getFullYear() === ano;

        const mesmoMes = dataDaAlocacao.getMonth() === mes - 1;

        return mesmoAno && mesmoMes;
    });
};

export function obterNomeGuardaVidas(id: number): string {
    const gv = guardaVidasMock.find((g) => g.id === id)
    return gv ? gv.nome : "Desconhecido"
}

export function obterNomePosto(id: number): string {
    const posto = postosMock.find((p) => p.id === id)
    return posto ? posto.nome : "Desconhecido"
}

export const existeAlocacaoNoDia = (dataAlvo: Date, alocacoes: AlocacaoDiaria[]): boolean => {
    return alocacoes.some(alocacao =>
        isSameDay(new Date(alocacao.data), dataAlvo)
    );
};

export const converterGVParaGVEscala = (listaDeGuardaVidas: GuardaVidas[]): GuardaVidasEscala[] => {
    if (!listaDeGuardaVidas) {
        return [];
    }

    return listaDeGuardaVidas.map(guardaVida => {
        return {
            id: guardaVida.id,
            nome: guardaVida.nome,
            preferenciasPostos: guardaVida.preferenciasPostos,
            diasIndisponiveis: guardaVida.diasIndisponiveis,
            estatisticas: guardaVida.estatisticas,
            diasDeFolga: guardaVida.diasDeFolga
        };
    });
};

export const guardaVidaTrabalhaEm = (guardaVida: GuardaVidasEscala, dataDoDia: Date): boolean => {
    const diasDaSemanaMap: DiaDaSemana[] = ["domingo", "segunda", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sabado"];
    const nomeDoDiaDaSemana = diasDaSemanaMap[dataDoDia.getDay()];

    if (guardaVida.diasDeFolga?.includes(nomeDoDiaDaSemana)) {
        return false;
    }

    return !guardaVida.diasIndisponiveis?.some(dia => isSameDay(new Date(dia.data), dataDoDia));
};

export const gerarEscalaDiaria = (
    listaDePostos: Posto[],
    listaDeGuardaVidas: GuardaVidas[],
    dataAlvo: Date
): AlocacaoDiaria[] => {
    let escala: AlocacaoDiaria[] = [];
    const gvAlocados: Set<number> = new Set();
    const gvDisponiveis = listaDeGuardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataAlvo));

    const gvNaoAlocados = () => gvDisponiveis.filter(gv => !gvAlocados.has(gv.id));

    const calcularScore = (gv: GuardaVidas, postoId: number) => {
        const preferencia = gv.preferenciasPostos?.find(p => p.postoId === postoId);
        const prioridadeScore = (preferencia?.prioridade ?? 0) * 10;
        const diasTrabalhadosScore = 100 - (gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0);
        return prioridadeScore + diasTrabalhadosScore;
    };

    gvDisponiveis.forEach(gv => {
        const pref10 = gv.preferenciasPostos?.find(p => p.prioridade === 10);
        const posto = pref10 ? listaDePostos.find(p => p.id === pref10.postoId) : undefined;
        const vagasOcupadas = escala.filter(a => a.postoId === posto?.id).length;
        if (posto && vagasOcupadas < posto.alocacaoMaxima) {
            escala.push({ id: uuid(), data: dataAlvo, guardaVidasId: gv.id, postoId: posto.id });
            gvAlocados.add(gv.id);
        }
    });

    const postosPriorizados = [...listaDePostos].sort((a, b) => b.alocacaoMaxima - a.alocacaoMaxima);

    for (const posto of postosPriorizados) {
        let vagasOcupadas = escala.filter(a => a.postoId === posto.id).length;
        while (vagasOcupadas < 2 && gvNaoAlocados().length > 0) {
            const candidatos = gvNaoAlocados()
                .map(gv => ({ gv, score: calcularScore(gv, posto.id) }))
                .sort((a, b) => b.score - a.score);
            if (candidatos.length === 0) break;
            const melhorCandidato = candidatos[0].gv;
            escala.push({ id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id });
            gvAlocados.add(melhorCandidato.id);
            vagasOcupadas++;
        }
    }

    for (const posto of postosPriorizados) {
        let vagasOcupadas = escala.filter(a => a.postoId === posto.id).length;
        while (vagasOcupadas < posto.alocacaoMaxima && gvNaoAlocados().length > 0) {
            const candidatos = gvNaoAlocados()
                .map(gv => ({ gv, score: calcularScore(gv, posto.id) }))
                .sort((a, b) => b.score - a.score);
            if (candidatos.length === 0) break;
            const melhorCandidato = candidatos[0].gv;
            escala.push({ id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id });
            gvAlocados.add(melhorCandidato.id);
            vagasOcupadas++;
        }
    }

    const contagemFinalPorPosto = escala.reduce((acc, alocacao) => {
        acc[alocacao.postoId] = (acc[alocacao.postoId] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const postosInvalidos = Object.entries(contagemFinalPorPosto)
        .filter(([, count]) => count === 1)
        .map(([postoId]) => Number(postoId));

    if (postosInvalidos.length > 0) {
        escala = escala.filter(alocacao => !postosInvalidos.includes(alocacao.postoId));
    }

    return escala;
};