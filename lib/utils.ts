import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import {isBefore, isSameDay, startOfToday} from "date-fns";
import {DiaDaSemana, GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import {v4 as uuid} from "uuid";
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

export const existeAlocacaoNoDia = (dia: Date, alocacoes: AlocacaoDiaria[]): boolean => {
    return alocacoes.some(a => isSameDay(new Date(a.data), dia));
};

export const verificarSeEHoje = (dia: Date): boolean => {
    return isSameDay(dia, startOfToday());
};

export const verificarSeJaPassou = (dia: Date): boolean => {
    return isBefore(dia, startOfToday());
};

export const formatarDiaSemana = (dia: string) => {
    if (!dia) return '';
    const comHifen = dia.replace('_', '-');
    return comHifen.charAt(0).toUpperCase() + comHifen.slice(1);
};

export const formatarDia = (dia: string) => dia.replace('_', '-').charAt(0).toUpperCase() + dia.slice(1, 3);

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

// Função interna que tenta gerar a escala com um conjunto de postos
const tentarGerarComPostosAtuais = (postosAtuais: Posto[], gvDisponiveis: GuardaVidasEscala[], dataAlvo: Date): AlocacaoDiaria[] => {
    let escala: AlocacaoDiaria[] = [];
    const gvAlocados: Set<string> = new Set();
    const gvNaoAlocados = () => gvDisponiveis.filter(gv => !gvAlocados.has(gv.id));

    // Fase 1: Prioridade 10
    gvDisponiveis.forEach(gv => {
        const pref10 = gv.preferenciasPostos?.find(p => p.prioridade === 10);
        if (pref10) {
            const posto = postosAtuais.find(p => p.id === pref10.postoId);
            if (posto && escala.filter(a => a.postoId === posto.id).length < posto.alocacaoMaxima) {
                escala.push({ id: uuid(), data: dataAlvo, guardaVidasId: gv.id, postoId: posto.id });
                gvAlocados.add(gv.id);
            }
        }
    });

    // Fase 2: Alocação em rodadas
    const postosPriorizados = [...postosAtuais].sort((a, b) => b.movimento - a.movimento);
    let continuarAlocando = true;
    while (continuarAlocando) {
        let alocouAlguemNestaRodada = false;
        if (gvNaoAlocados().length === 0) break;
        for (const posto of postosPriorizados) {
            const vagasOcupadas = escala.filter(a => a.postoId === posto.id).length;
            if (vagasOcupadas < 2 && gvNaoAlocados().length > 0) {
                const candidatos = gvNaoAlocados().map(gv => ({ gv, score: calcularScore(gv, posto.id) })).sort((a, b) => b.score - a.score);
                if (candidatos.length > 0) {
                    const melhorCandidato = candidatos[0].gv;
                    escala.push({ id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id });
                    gvAlocados.add(melhorCandidato.id);
                    alocouAlguemNestaRodada = true;
                }
            }
        }
        if (!alocouAlguemNestaRodada) continuarAlocando = false;
    }
    return escala;
};

// Função principal que orquestra as tentativas
export const gerarEscalaDiaria = (
    listaDePostos: Posto[],
    listaDeGuardaVidas: GuardaVidasEscala[],
    dataAlvo: Date
): AlocacaoDiaria[] => {
    console.group("--- INÍCIO DA GERAÇÃO DE ESCALA ---");
    console.log("Data Alvo:", dataAlvo.toLocaleDateString('pt-BR'));

    const gvDisponiveis = listaDeGuardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataAlvo));
    let postosParaTentar = listaDePostos.filter(p => postoEstaAberto(p, dataAlvo));

    console.log(`Encontrados ${gvDisponiveis.length} GVs disponíveis e ${postosParaTentar.length} postos abertos inicialmente.`);

    let escalaFinal: AlocacaoDiaria[] = [];
    let tentativa = 1;

    while (postosParaTentar.length > 0) {
        console.group(`--- Tentativa ${tentativa} com ${postosParaTentar.length} postos ---`);

        const escalaTentativa = tentarGerarComPostosAtuais(postosParaTentar, gvDisponiveis, dataAlvo);

        const contagemPorPosto = escalaTentativa.reduce((acc, alocacao) => {
            acc[alocacao.postoId] = (acc[alocacao.postoId] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Adiciona os postos que ficaram com 0 GVs na contagem para serem considerados inválidos
        postosParaTentar.forEach(posto => {
            if (!contagemPorPosto[posto.id]) {
                contagemPorPosto[posto.id] = 0;
            }
        });

        const postosInvalidos = Object.keys(contagemPorPosto).filter(postoId => contagemPorPosto[postoId] < 2);

        console.log("Contagem da tentativa:", contagemPorPosto);

        if (postosInvalidos.length === 0) {
            console.log("%cEscala VÁLIDA encontrada! Finalizando processo.", "color: lightgreen; font-weight: bold;");
            escalaFinal = escalaTentativa;
            console.groupEnd();
            break;
        } else {
            console.log("%cEscala INVÁLIDA. Postos com menos de 2 GVs:", "color: orange;", postosInvalidos);

            // Se não for possível formar uma escala válida com os postos restantes, para.
            if (postosParaTentar.length <= postosInvalidos.length) {
                console.warn("Não é possível formar uma escala válida com os GVs e postos restantes. Interrompendo.");
                console.groupEnd();
                break;
            }

            const postosOrdenados = [...postosParaTentar].sort((a, b) => a.movimento - b.movimento);
            const postoRemovido = postosOrdenados[0];
            console.log(`Removendo o posto de menor movimento para a próxima tentativa: "${postoRemovido.nome}"`);
            postosParaTentar = postosParaTentar.filter(p => p.id !== postoRemovido.id);
            console.groupEnd();
        }
        tentativa++;
    }

    // Fase final de reforço, se sobrar gente
    const gvAlocadosFinal = new Set(escalaFinal.map(a => a.guardaVidasId));
    const gvNaoAlocadosFinal = () => gvDisponiveis.filter(gv => !gvAlocadosFinal.has(gv.id));
    if (gvNaoAlocadosFinal().length > 0) {
        console.group("Alocação de Reforço Final");
        const postosDaEscalaFinal = postosParaTentar.sort((a, b) => b.movimento - a.movimento);
        for (const posto of postosDaEscalaFinal) {
            if (gvNaoAlocadosFinal().length === 0) break;
            const candidatos = gvNaoAlocadosFinal().map(gv => ({ gv, score: calcularScore(gv, posto.id) })).sort((a, b) => b.score - a.score);
            if (candidatos.length > 0) {
                const melhorCandidato = candidatos[0].gv;
                console.log(`Alocando REFORÇO ${melhorCandidato.nome} no posto ${posto.nome}`);
                escalaFinal.push({ id: uuid(), data: dataAlvo, guardaVidasId: melhorCandidato.id, postoId: posto.id });
                gvAlocadosFinal.add(melhorCandidato.id);
            }
        }
        console.groupEnd();
    }

    console.log("--- ESCALA FINAL GERADA ---", escalaFinal);
    console.groupEnd();

    return escalaFinal;
};
