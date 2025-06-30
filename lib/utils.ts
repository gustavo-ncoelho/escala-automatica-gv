import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import {isSameDay} from "date-fns";
import {DiaDaSemana, GuardaVidas, GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import {v4 as uuid} from "uuid";
import {guardaVidasMock} from "@/utils/dados-simulados";
import {Usuario} from "@/types/auth/usuario";

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

export const gerarArrayDeDatasDoMes = (mes: number, ano: number): Date[] => {
    const diasNoMes = new Date(ano, mes, 0).getDate();

    return Array.from({length: diasNoMes}, (_, i) => {
        const dia = i + 1;
        return new Date(ano, mes - 1, dia);
    });
};

export const diasDaSemanaOpcoes = [
    { id: "segunda", label: "Segunda-feira" },
    { id: "terca_feira", label: "Terça-feira" },
    { id: "quarta_feira", label: "Quarta-feira" },
    { id: "quinta_feira", label: "Quinta-feira" },
    { id: "sexta_feira", label: "Sexta-feira" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
] as const;

export const dataAtual = new Date();

export const anosParaSelecionar = Array.from({ length: 5 }, (_, i) => dataAtual.getFullYear() - 2 + i);


export const mesesParaSelecionar = [
    { valor: 1, nome: 'Janeiro' },
    { valor: 2, nome: 'Fevereiro' },
    { valor: 3, nome: 'Março' },
    { valor: 4, nome: 'Abril' },
    { valor: 5, nome: 'Maio' },
    { valor: 6, nome: 'Junho' },
    { valor: 7, nome: 'Julho' },
    { valor: 8, nome: 'Agosto' },
    { valor: 9, nome: 'Setembro' },
    { valor: 10, nome: 'Outubro' },
    { valor: 11, nome: 'Novembro' },
    { valor: 12, nome: 'Dezembro' },
];

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
};

export const formatarDiaSemana = (dia: string) => {
    if (!dia) return '';
    const comHifen = dia.replace('_', '-');
    return comHifen.charAt(0).toUpperCase() + comHifen.slice(1);
};

export const contarGuardaVidasPorDia = (targetDate: Date, alocacoes: AlocacaoDiaria[]): number => {
    if (!targetDate || !alocacoes) {
        return 0;
    }

    const alocacoesDoDia = alocacoes.filter(alocacao =>
        isSameDay(alocacao.data, targetDate)
    );

    return alocacoesDoDia.length;
};

export const filtrarAlocacoesPorMes = (mes: number, ano: number, todasAsAlocacoes: AlocacaoDiaria[]): AlocacaoDiaria[] => {
    return todasAsAlocacoes.filter(alocacao => {
        const dataDaAlocacao = new Date(alocacao.data);

        const mesmoAno = dataDaAlocacao.getFullYear() === ano;

        const mesmoMes = dataDaAlocacao.getMonth() === mes - 1;

        return mesmoAno && mesmoMes;
    });
};

export function obterNomeGuardaVidas(id: string): string {
    const gv = guardaVidasMock.find((g) => g.id === id)
    return gv ? gv.nome : "Desconhecido"
}

export function obterNomePosto(id: string, postos: Posto[]): string {
    const posto = postos.find((p) => p.id === id)
    return posto ? posto.nome : "Desconhecido"
}

export const existeAlocacaoNoDia = (dataAlvo: Date, alocacoes: AlocacaoDiaria[]): boolean => {
    return alocacoes.some(alocacao =>
        isSameDay(new Date(alocacao.data), dataAlvo)
    );
};

export const converterGVParaGVEscala = (listaDeGuardaVidas?: Usuario[]): GuardaVidasEscala[] => {
    if (!listaDeGuardaVidas) {
        return [];
    }

    return listaDeGuardaVidas.map(guardaVida => {
        return {
            id: guardaVida.id,
            nome: guardaVida.nome,
            preferenciasPostos: guardaVida.perfilGuardaVidas?.preferenciasPostos,
            diasIndisponiveis: guardaVida.perfilGuardaVidas?.diasIndisponiveis,
            estatisticas: guardaVida.perfilGuardaVidas?.estatisticas,
            diasDeFolga: guardaVida.perfilGuardaVidas?.diasDeFolga
        };
    });
};

export const guardaVidaTrabalhaEm = (guardaVida: GuardaVidasEscala, dataDoDia: Date): boolean => {
    const diasDaSemanaMap: DiaDaSemana[] = [ "domingo", "segunda", "terca_feira", "quarta_feira", "quinta_feira", "sexta_feira", "sabado"];
    const nomeDoDiaDaSemana = diasDaSemanaMap[dataDoDia.getDay()];

    if (guardaVida.diasDeFolga?.includes(nomeDoDiaDaSemana)) {
        return false;
    }

    return !guardaVida.diasIndisponiveis?.some(dia => isSameDay(new Date(dia.data), dataDoDia));
};

export const gerarEscalaDiaria = (listaDePostos: Posto[], listaDeGuardaVidas: GuardaVidasEscala[], dataAlvo: Date): AlocacaoDiaria[] => {
    let escala: AlocacaoDiaria[] = [];
    const gvAlocados: Set<string> = new Set();
    const gvDisponiveis = listaDeGuardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataAlvo));

    const gvNaoAlocados = () => gvDisponiveis.filter(gv => !gvAlocados.has(gv.id));

    const calcularScore = (gv: GuardaVidasEscala, postoId: string) => {
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
    }, {} as Record<string, number>);

    const postosInvalidos = Object.entries(contagemFinalPorPosto)
        .filter(([, count]) => count === 1)
        .map(([postoId]) => postoId);

    if (postosInvalidos.length > 0) {
        escala = escala.filter(alocacao => !postosInvalidos.includes(alocacao.postoId));
    }

    return escala;
};