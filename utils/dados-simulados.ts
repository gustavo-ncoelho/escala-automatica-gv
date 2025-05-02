import type {GuardaVidas, Posto} from "@/types/guarda-vidas"
import type {EscalaMensal} from "@/types/escala"
import type {Solicitacao} from "@/types/solicitacao"

export const dadosGuardaVidas: GuardaVidas = {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos.silva@email.com",
    telefone: "(47) 99123-4567",
    dataAdmissao: new Date("2020-01-15"),
    preferenciasPostos: [
        {postoId: 1, justificativa: "Próximo à minha residência, facilitando o deslocamento."},
        {postoId: 3, justificativa: "Tenho experiência com as correntes desta praia."},
        {postoId: 5, justificativa: "Ambiente mais tranquilo, ideal para dias de menor movimento."},
    ],
    diasIndisponiveis: [
        {data: new Date("2023-07-10"), motivo: "Consulta médica"},
        {data: new Date("2023-07-20"), motivo: "Compromisso familiar"},
    ],
    colaboradoresNaoPreferidos: [{guardaVidasId: 3, motivo: "Diferenças na abordagem de trabalho"}],
    estatisticas: {
        diasTrabalhados: 12,
        diasRestantes: 8,
    },
}

export const postos: Posto[] = [
    {id: 1, nome: "Posto 1 - Praia Central", localizacao: "Praia Central"},
    {id: 2, nome: "Posto 2 - Praia do Forte", localizacao: "Praia do Forte"},
    {id: 3, nome: "Posto 3 - Praia dos Amores", localizacao: "Praia dos Amores"},
    {id: 4, nome: "Posto 4 - Praia Brava", localizacao: "Praia Brava"},
    {id: 5, nome: "Posto 5 - Praia Mansa", localizacao: "Praia Mansa"},
]

export const outrosGuardaVidas: GuardaVidas[] = [
    {
        id: 2,
        nome: "Ana Oliveira",
        email: "ana.oliveira@email.com",
        telefone: "(47) 99234-5678",
        dataAdmissao: new Date("2019-03-20"),
        preferenciasPostos: [
            {postoId: 2, justificativa: "Experiência prévia neste posto."},
            {postoId: 3, justificativa: "Familiaridade com as condições do mar nesta praia."},
        ],
        diasIndisponiveis: [
            {data: new Date("2023-07-05"), motivo: "Curso de primeiros socorros"},
            {data: new Date("2023-07-15"), motivo: "Férias"},
        ],
        colaboradoresNaoPreferidos: [],
        estatisticas: {
            diasTrabalhados: 15,
            diasRestantes: 5,
        },
    },
    {
        id: 3,
        nome: "Pedro Santos",
        email: "pedro.santos@email.com",
        telefone: "(47) 99345-6789",
        dataAdmissao: new Date("2021-05-10"),
        preferenciasPostos: [
            {postoId: 3, justificativa: "Proximidade da minha residência."},
            {postoId: 4, justificativa: "Familiaridade com o local."},
        ],
        diasIndisponiveis: [{data: new Date("2023-07-25"), motivo: "Treinamento"}],
        colaboradoresNaoPreferidos: [{guardaVidasId: 1, motivo: "Diferenças na abordagem de trabalho"}],
        estatisticas: {
            diasTrabalhados: 10,
            diasRestantes: 10,
        },
    },
]

export const guardaVidas = [dadosGuardaVidas, ...outrosGuardaVidas]

export const escalaMensal: EscalaMensal = {
    mes: 7,
    ano: 2023,
    alocacoes: [
        {data: new Date("2023-07-01"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-02"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-03"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-04"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-05"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-08"), guardaVidasId: 1, postoId: 5},
        {data: new Date("2023-07-09"), guardaVidasId: 1, postoId: 5},
        {data: new Date("2023-07-12"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-13"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-15"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-16"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-19"), guardaVidasId: 1, postoId: 5},

        {data: new Date("2023-07-22"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-23"), guardaVidasId: 1, postoId: 1},
        {data: new Date("2023-07-26"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-27"), guardaVidasId: 1, postoId: 3},
        {data: new Date("2023-07-29"), guardaVidasId: 1, postoId: 5},
        {data: new Date("2023-07-30"), guardaVidasId: 1, postoId: 5},

        {data: new Date("2023-07-01"), guardaVidasId: 2, postoId: 2},
        {data: new Date("2023-07-02"), guardaVidasId: 2, postoId: 2},
        {data: new Date("2023-07-03"), guardaVidasId: 3, postoId: 4},
        {data: new Date("2023-07-04"), guardaVidasId: 3, postoId: 4},
    ],
}

export const solicitacoes: Solicitacao[] = [
    {
        id: 1,
        guardaVidasId: 1,
        tipo: "dia_indisponivel",
        dataOriginal: new Date("2023-07-15"),
        dataSolicitada: new Date("2023-07-16"),
        motivo: "Compromisso familiar inadiável",
        status: "aprovada",
        dataCriacao: new Date("2023-07-10"),
        dataAtualizacao: new Date("2023-07-11"),
    },
    {
        id: 2,
        guardaVidasId: 1,
        tipo: "preferencia_posto",
        postoOriginal: 3,
        postoSolicitado: 1,
        motivo: "Preferência por posto mais próximo de casa",
        status: "pendente",
        dataCriacao: new Date("2023-07-12"),
        dataAtualizacao: new Date("2023-07-12"),
    },
    {
        id: 3,
        guardaVidasId: 1,
        tipo: "colega_nao_preferido",
        colegaNaoPreferido: 3,
        motivo: "Diferenças na abordagem de trabalho",
        status: "rejeitada",
        dataCriacao: new Date("2023-07-08"),
        dataAtualizacao: new Date("2023-07-09"),
    },
    {
        id: 4,
        guardaVidasId: 2,
        tipo: "dia_indisponivel",
        dataOriginal: new Date("2023-07-22"),
        dataSolicitada: new Date("2023-07-23"),
        motivo: "Evento familiar",
        status: "pendente",
        dataCriacao: new Date("2023-07-08"),
        dataAtualizacao: new Date("2023-07-08"),
    },
]

export function obterNomeGuardaVidas(id: number): string {
    if (id === dadosGuardaVidas.id) return dadosGuardaVidas.nome

    const gv = outrosGuardaVidas.find((g) => g.id === id)
    return gv ? gv.nome : "Desconhecido"
}

export function obterNomePosto(id: number): string {
    const posto = postos.find((p) => p.id === id)
    return posto ? posto.nome : "Desconhecido"
}

export function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR")
}

export const niveisLotacao = [
    {data: new Date("2023-07-01"), nivel: 3},
    {data: new Date("2023-07-02"), nivel: 4},
    {data: new Date("2023-07-03"), nivel: 2},
    {data: new Date("2023-07-04"), nivel: 5},
    {data: new Date("2023-07-05"), nivel: 3},
    {data: new Date("2023-07-06"), nivel: 1},
    {data: new Date("2023-07-07"), nivel: 2},
    {data: new Date("2023-07-08"), nivel: 4},
    {data: new Date("2023-07-09"), nivel: 3},
    {data: new Date("2023-07-10"), nivel: 2},
    {data: new Date("2023-07-11"), nivel: 1},
    {data: new Date("2023-07-12"), nivel: 3},
    {data: new Date("2023-07-13"), nivel: 4},
    {data: new Date("2023-07-14"), nivel: 2},
    {data: new Date("2023-07-15"), nivel: 5},
    {data: new Date("2023-07-16"), nivel: 3},
    {data: new Date("2023-07-17"), nivel: 1},
    {data: new Date("2023-07-18"), nivel: 2},
    {data: new Date("2023-07-19"), nivel: 4},
    {data: new Date("2023-07-20"), nivel: 3},
    {data: new Date("2023-07-21"), nivel: 2},
    {data: new Date("2023-07-22"), nivel: 1},
    {data: new Date("2023-07-23"), nivel: 3},
    {data: new Date("2023-07-24"), nivel: 4},
    {data: new Date("2023-07-25"), nivel: 2},
    {data: new Date("2023-07-26"), nivel: 5},
    {data: new Date("2023-07-27"), nivel: 3},
    {data: new Date("2023-07-28"), nivel: 1},
    {data: new Date("2023-07-29"), nivel: 2},
    {data: new Date("2023-07-30"), nivel: 4},
    {data: new Date("2023-07-31"), nivel: 3},
]
