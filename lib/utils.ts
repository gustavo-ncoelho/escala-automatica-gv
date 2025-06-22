import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/escala";
import {isSameDay} from "date-fns";
import {DiaDaSemana, GuardaVidas, GuardaVidasEscala, Posto} from "@/types/guarda-vidas";

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

    const escalaFinal: AlocacaoDiaria[] = [];
    const vagasOcupadas: Map<number, number> = new Map(listaDePostos.map(p => [p.id, 0]));
    const gvAlocados: Set<number> = new Set();

    const gvDisponiveis = listaDeGuardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataAlvo));

    gvDisponiveis.forEach(gv => {
        const pref10 = gv.preferenciasPostos?.find(p => p.prioridade === 10);
        const posto = pref10 ? listaDePostos.find(p => p.id === pref10.postoId) : undefined;

        if (posto && (vagasOcupadas.get(posto.id) ?? 0) < posto.alocacaoMaxima) {
            escalaFinal.push({ data: dataAlvo, guardaVidasId: gv.id, postoId: posto.id });
            gvAlocados.add(gv.id);
            vagasOcupadas.set(posto.id, (vagasOcupadas.get(posto.id) ?? 0) + 1);
        }
    });

    const gvNaoAlocados = () => gvDisponiveis.filter(gv => !gvAlocados.has(gv.id));

    listaDePostos.forEach(posto => {
        let vagasAtuais = vagasOcupadas.get(posto.id) ?? 0;
        while (vagasAtuais < posto.alocacaoMaxima && gvNaoAlocados().length > 0) {
            const candidatos = gvNaoAlocados().map(gv => {
                const preferencia = gv.preferenciasPostos?.find(p => p.postoId === posto.id);
                const prioridadeScore = (preferencia?.prioridade ?? 0) * 10;
                const diasTrabalhadosScore = 100 - (gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0);
                const score = prioridadeScore + diasTrabalhadosScore;
                return { gv, score };
            }).sort((a, b) => b.score - a.score);

            if (candidatos.length === 0) break;

            const melhorCandidato = candidatos[0].gv;

            escalaFinal.push({ data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id });
            gvAlocados.add(melhorCandidato.id);
            vagasOcupadas.set(posto.id, vagasAtuais + 1);
            vagasAtuais++;
        }
    });

    return escalaFinal;
};