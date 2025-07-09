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

export const normalizeDateToLocal = (dateInput: string | Date | null | undefined): Date => {
    if (!dateInput) return new Date(NaN);

    const date = new Date(dateInput);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    return new Date(year, month, day);
};

export const gerarArrayDeDatasDoMes = (mes: number, ano: number): Date[] => {
    const diasNoMes = new Date(ano, mes, 0).getDate();

    return Array.from({length: diasNoMes}, (_, i) => {
        const dia = i + 1;
        return new Date(ano, mes - 1, dia);
    });
};

export const diasDaSemanaOpcoes = [
    {id: "segunda", label: "Segunda-feira"},
    {id: "terca_feira", label: "Terça-feira"},
    {id: "quarta_feira", label: "Quarta-feira"},
    {id: "quinta_feira", label: "Quinta-feira"},
    {id: "sexta_feira", label: "Sexta-feira"},
    {id: "sabado", label: "Sábado"},
    {id: "domingo", label: "Domingo"},
] as const;

export const dataAtual = new Date();

export const anosParaSelecionar = Array.from({length: 5}, (_, i) => dataAtual.getFullYear() - 2 + i);


export const mesesParaSelecionar = [
    {valor: 1, nome: 'Janeiro'},
    {valor: 2, nome: 'Fevereiro'},
    {valor: 3, nome: 'Março'},
    {valor: 4, nome: 'Abril'},
    {valor: 5, nome: 'Maio'},
    {valor: 6, nome: 'Junho'},
    {valor: 7, nome: 'Julho'},
    {valor: 8, nome: 'Agosto'},
    {valor: 9, nome: 'Setembro'},
    {valor: 10, nome: 'Outubro'},
    {valor: 11, nome: 'Novembro'},
    {valor: 12, nome: 'Dezembro'},
];

export function formatarData(data?: Date): string {
    if (!data) return "--/--/----";
    return data.toLocaleDateString("pt-BR")
}

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

export const formatarDia = (dia: string) => dia.replace('_', '-').charAt(0).toUpperCase() + dia.slice(1, 3);

export const filtrarAlocacoesPorMes = (mes: number, ano: number, todasAsAlocacoes: AlocacaoDiaria[]): AlocacaoDiaria[] => {
    return todasAsAlocacoes.filter(alocacao => {
        const dataDaAlocacao = new Date(alocacao.data);

        const mesmoAno = dataDaAlocacao.getFullYear() === ano;

        const mesmoMes = dataDaAlocacao.getMonth() === mes - 1;

        return mesmoAno && mesmoMes;
    });
};

export const contarDiasTrabalhadosPorGuardaVida = (alocacoes: AlocacaoDiaria[]): Record<string, number> => {

    return alocacoes.reduce((contagem, alocacao) => {
        const id = alocacao.guardaVidasId;

        contagem[id] = (contagem[id] || 0) + 1;

        return contagem;
    }, {} as Record<string, number>);
};

export function obterNomeGuardaVidas(id: string, guardaVidas: Usuario[]): string {
    const gv = guardaVidas.find((g) => g?.perfilGuardaVidas?.id === id)
    return gv ? gv.nome : "Desconhecido"
};

export function obterNomePosto(postos?: Posto[], id?: string): string {
    if (!id) return "Não encontrado";
    if (postos?.length === 0 || !postos) return "";
    const posto = postos.find((p) => p.id === id)
    return posto ? posto.nome : "Desconhecido"
};

export const converterListaGVParaListaGVEscala = (listaDeGuardaVidas?: Usuario[]): GuardaVidasEscala[] => {
    if (!listaDeGuardaVidas) {
        return [];
    }

    return listaDeGuardaVidas.map(guardaVida => {
        return {
            id: guardaVida.perfilGuardaVidas?.id ?? "",
            nome: guardaVida.nome,
            preferenciasPostos: guardaVida.perfilGuardaVidas?.preferenciasPostos,
            diasIndisponiveis: guardaVida.perfilGuardaVidas?.diasIndisponiveis,
            estatisticas: guardaVida.perfilGuardaVidas?.estatisticas,
            diasDeFolga: guardaVida.perfilGuardaVidas?.diasDeFolga
        };
    });
};

export const converterGVParaGVEscala = (guardaVida: Usuario): GuardaVidasEscala => {
    return {
        id: guardaVida.perfilGuardaVidas?.id ?? "",
        nome: guardaVida.nome,
        preferenciasPostos: guardaVida.perfilGuardaVidas?.preferenciasPostos,
        diasIndisponiveis: guardaVida.perfilGuardaVidas?.diasIndisponiveis,
        estatisticas: guardaVida.perfilGuardaVidas?.estatisticas,
        diasDeFolga: guardaVida.perfilGuardaVidas?.diasDeFolga
    };
};

const diasDaSemanaMap: DiaDaSemana[] = ["domingo", "segunda", "terca_feira", "quarta_feira", "quinta_feira", "sexta_feira", "sabado"];

export const guardaVidaTrabalhaEm = (guardaVida: GuardaVidasEscala, dataDoDia: Date): boolean => {
    const nomeDoDiaDaSemana = diasDaSemanaMap[dataDoDia.getDay()];

    if (guardaVida.diasDeFolga?.includes(nomeDoDiaDaSemana)) {
        return false;
    }

    return !guardaVida.diasIndisponiveis?.some(dia => isSameDay(new Date(dia.data), dataDoDia));
};

export const postoEstaAberto = (posto: Posto, dataDoDia: Date): boolean => {
    const nomeDoDiaDaSemana = diasDaSemanaMap[dataDoDia.getDay()];
    if (posto.diasFechados?.includes(nomeDoDiaDaSemana)) return false;
    return !posto.datasFechadas?.some(dia => isSameDay(new Date(dia.data), dataDoDia));
};

const calcularScore = (gv: GuardaVidasEscala, postoId: string) => {
    const preferencia = gv.preferenciasPostos?.find(p => p.postoId === postoId);
    const prioridadeScore = (preferencia?.prioridade ?? 0) * 10;
    const diasTrabalhadosScore = 100 - (gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0);
    return prioridadeScore + diasTrabalhadosScore;
};

export const getGuardaVidasPorPosto = (postoId: string, alocacoes: AlocacaoDiaria[], dataDoDia: Date, guardaVidas: GuardaVidasEscala[]) => {
    const alocacoesPosto = alocacoes.filter(
        (alocacao) => {
            return alocacao.postoId === postoId && isSameDay(alocacao.data, dataDoDia);
        }
    );

    return alocacoesPosto.map((alocacao) => {
        const guardaVida = guardaVidas.find((gv) => gv.id === alocacao.guardaVidasId);
        return guardaVida?.nome || "Não encontrado";
    });
};

export const gerarEscalaDiaria = (listaDePostos: Posto[], listaDeGuardaVidas: GuardaVidasEscala[], dataAlvo: Date): AlocacaoDiaria[] => {
    console.group("--- INÍCIO DA GERAÇÃO DE ESCALA ---");
    console.log("Data Alvo:", dataAlvo.toLocaleDateString('pt-BR'));

    let escala: AlocacaoDiaria[] = [];
    const gvAlocados: Set<string> = new Set();

    const gvDisponiveis = listaDeGuardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataAlvo));
    const postosAbertos = listaDePostos.filter(p => postoEstaAberto(p, dataAlvo));
    const postosPriorizados = [...postosAbertos].sort((a, b) => b.movimento - a.movimento);

    console.log(`Encontrados ${gvDisponiveis.length} GVs disponíveis e ${postosAbertos.length} postos abertos.`);

    const gvNaoAlocados = () => gvDisponiveis.filter(gv => !gvAlocados.has(gv.id));

    // Fase 1: Alocações Obrigatórias (Prioridade 10)
    console.group("Fase 1: Alocações Obrigatórias (Prioridade 10)");
    gvDisponiveis.forEach(gv => {
        const pref10 = gv.preferenciasPostos?.find(p => p.prioridade === 10);
        if (pref10) {
            const posto = postosAbertos.find(p => p.id === pref10.postoId);
            if (posto && escala.filter(a => a.postoId === posto.id).length < posto.alocacaoMaxima) {
                console.log(`Alocando ${gv.nome} no posto ${posto.nome} (Prioridade 10)`);
                escala.push({id: uuid(), data: dataAlvo, guardaVidasId: gv.id, postoId: posto.id});
                gvAlocados.add(gv.id);
            }
        }
    });
    console.groupEnd();

    // Fase 2: Garantir o Mínimo de 2 GVs por posto
    console.group("Fase 2: Garantia do Mínimo de 2 GVs");
    for (let i = 0; i < 2; i++) { // Duas rodadas obrigatórias
        console.log(`--- Rodada Obrigatória ${i + 1} ---`);
        for (const posto of postosPriorizados) {
            const vagasOcupadas = escala.filter(a => a.postoId === posto.id).length;
            if (vagasOcupadas < i + 1 && gvNaoAlocados().length > 0) {
                const candidatos = gvNaoAlocados().map(gv => ({
                    gv,
                    score: calcularScore(gv, posto.id)
                })).sort((a, b) => b.score - a.score);
                if (candidatos.length > 0) {
                    const melhorCandidato = candidatos[0].gv;
                    console.log(`Alocando ${melhorCandidato.nome} no posto ${posto.nome} para garantir o mínimo.`);
                    escala.push({id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id});
                    gvAlocados.add(melhorCandidato.id);
                }
            }
        }
    }
    console.groupEnd();

    // Fase 3: Consolidação - Remover postos que não atingiram o mínimo de 2
    console.group("Fase 3: Consolidação (Remover postos com 1 GV)");
    const contagemPorPosto = escala.reduce((acc, alocacao) => {
        acc[alocacao.postoId] = (acc[alocacao.postoId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const postosInvalidos = Object.keys(contagemPorPosto).filter(postoId => contagemPorPosto[postoId] === 1);

    if (postosInvalidos.length > 0) {
        console.log("Postos com apenas 1 GV encontrados:", postosInvalidos);
        const gvsRemovidos = escala.filter(alocacao => postosInvalidos.includes(alocacao.postoId)).map(a => a.guardaVidasId);
        gvsRemovidos.forEach(id => gvAlocados.delete(id));
        escala = escala.filter(alocacao => !postosInvalidos.includes(alocacao.postoId));
        console.log("GVs devolvidos ao pool:", gvsRemovidos);
    } else {
        console.log("Nenhum posto com apenas 1 GV. Nenhum ajuste necessário.");
    }
    console.groupEnd();

    // Fase 4: Preencher vagas restantes até o máximo
    console.group("Fase 4: Preenchimento até a Alocação Máxima");
    let continuarAlocando = true;
    while (continuarAlocando) {
        let alocouAlguemNestaRodada = false;
        if (gvNaoAlocados().length === 0) break;

        for (const posto of postosPriorizados) {
            const vagasOcupadas = escala.filter(a => a.postoId === posto.id).length;
            if (vagasOcupadas < posto.alocacaoMaxima && gvNaoAlocados().length > 0) {
                const candidatos = gvNaoAlocados().map(gv => ({
                    gv,
                    score: calcularScore(gv, posto.id)
                })).sort((a, b) => b.score - a.score);
                if (candidatos.length > 0) {
                    const melhorCandidato = candidatos[0].gv;
                    console.log(`Preenchendo vaga em ${posto.nome} com ${melhorCandidato.nome}`);
                    escala.push({id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id});
                    gvAlocados.add(melhorCandidato.id);
                    alocouAlguemNestaRodada = true;
                }
            }
        }
        if (!alocouAlguemNestaRodada) continuarAlocando = false;
    }
    console.groupEnd();

    // Fase 5: Alocação de Reforço (Super-Lotação)
    console.group("Fase 5: Alocação de Reforço (Super-Lotação)");
    if (gvNaoAlocados().length > 0) {
        console.log(`Sobraram ${gvNaoAlocados().length} GVs. Iniciando alocação de reforço.`);
        for (const posto of postosPriorizados) {
            if (gvNaoAlocados().length === 0) break;
            const candidatos = gvNaoAlocados().map(gv => ({
                gv,
                score: calcularScore(gv, posto.id)
            })).sort((a, b) => b.score - a.score);
            if (candidatos.length > 0) {
                const melhorCandidato = candidatos[0].gv;
                console.log(`Alocando REFORÇO ${melhorCandidato.nome} no posto ${posto.nome}`);
                escala.push({id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id});
                gvAlocados.add(melhorCandidato.id);
            }
        }
    } else {
        console.log("Nenhum GV sobrando para reforço.");
    }
    console.groupEnd();

    console.log("--- ESCALA FINAL GERADA ---", escala);
    console.groupEnd();

    return escala;
};