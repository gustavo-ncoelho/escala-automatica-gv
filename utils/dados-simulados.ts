import {GuardaVidas, Posto} from "@/types/guarda-vidas"
import {AlocacaoDiaria} from "@/types/alocacao-diaria"
import type {Solicitacao} from "@/types/solicitacao"

export const guardaVidasMock: GuardaVidas[] = [
    {
        id: "1", nome: "Samuel Cruz", email: "samuel.cruz@emailficticio.com", telefone: "(51) 99123-4567", dataAdmissao: new Date("2022-11-15"), diasDeFolga: ["segunda", "quinta-feira"],
        diasIndisponiveis: [
            { data: new Date(2025, 2, 14), motivo: "Consulta médica" }
        ],
        preferenciasPostos: [
            { postoId: "2", prioridade: 7 },
            { postoId: "4", prioridade: 9 }
        ]
    },
    {
        id: "2", nome: "Samuel Felisberto", email: "samuel.felisberto@emailficticio.com", telefone: "(51) 99234-5678", dataAdmissao: new Date("2021-03-20"), diasDeFolga: ["terça-feira", "sexta-feira"],
        preferenciasPostos: [
            { postoId: "1", prioridade: 10 },
            { postoId: "3", prioridade: 5 }
        ]
    },
    {
        id: "3", nome: "Luan Silva", email: "luan.silva@emailficticio.com", telefone: "(51) 99345-6789", dataAdmissao: new Date("2023-01-10"), diasDeFolga: ["quarta-feira", "sabado"],
        preferenciasPostos: [
            { postoId: "4", prioridade: 8 },
            { postoId: "2", prioridade: 6 }
        ]
    },
    {
        id: "4", nome: "Luis Santos", email: "luis.santos@emailficticio.com", telefone: "(51) 99456-7890", dataAdmissao: new Date("2020-12-01"), diasDeFolga: ["quinta-feira", "domingo"],
        preferenciasPostos: [
            { postoId: "1", prioridade: 9 },
            { postoId: "4", prioridade: 3 }
        ]
    },
    {
        id: "5", nome: "Lucio Oliveira", email: "lucio.oliveira@emailficticio.com", telefone: "(51) 99567-8901", dataAdmissao: new Date("2023-02-25"), diasDeFolga: ["sexta-feira", "segunda"],
        preferenciasPostos: [
            { postoId: "3", prioridade: 10 },
            { postoId: "1", prioridade: 7 }
        ]
    },
    {
        id: "6", nome: "Emanoel Costa", email: "emanoel.costa@emailficticio.com", telefone: "(51) 99678-9012", dataAdmissao: new Date("2022-05-18"), diasDeFolga: ["sabado", "terça-feira"],
        diasIndisponiveis: [
            { data: new Date(2025, 6, 10), motivo: "Consulta médica" }
        ],
        preferenciasPostos: [
            { postoId: "2", prioridade: 3 },
            { postoId: "3", prioridade: 8 }
        ]
    },
    {
        id: "7", nome: "Gustavo Lopes", email: "gustavo.lopes@emailficticio.com", telefone: "(51) 99789-0123", dataAdmissao: new Date("2024-11-05"), diasDeFolga: ["domingo", "quarta-feira"],
        preferenciasPostos: [
            { postoId: "1", prioridade: 8 },
            { postoId: "4", prioridade: 6 }
        ]
    },
    {
        id: "8", nome: "Thomas Almeida", email: "thomas.almeida@emailficticio.com", telefone: "(51) 99890-1234", dataAdmissao: new Date("2023-10-30"), diasDeFolga: ["segunda", "sexta-feira"],
        preferenciasPostos: [
            { postoId: "3", prioridade: 9 },
            { postoId: "2", prioridade: 4 }
        ]
    },
    {
        id: "9", nome: "Lenoir Pereira", email: "lenoir.pereira@emailficticio.com", telefone: "(51) 99901-2345", dataAdmissao: new Date("2019-12-12"), diasDeFolga: ["terça-feira", "quinta-feira"],
        preferenciasPostos: [
            { postoId: "4", prioridade: 7 },
            { postoId: "2", prioridade: 10 }
        ]
    },
    {
        id: "10", nome: "Moacir Souza", email: "moacir.souza@emailficticio.com", telefone: "(51) 98123-4567", dataAdmissao: new Date("2021-01-07"), diasDeFolga: ["quarta-feira", "domingo"],
        preferenciasPostos: [
            { postoId: "2", prioridade: 9 },
            { postoId: "4", prioridade: 8 }
        ]
    },
    {
        id: "11", nome: "Juliano Ferreira", email: "juliano.ferreira@emailficticio.com", telefone: "(51) 98234-5678", dataAdmissao: new Date("2024-02-14"), diasDeFolga: ["sabado", "segunda"],
        preferenciasPostos: [
            { postoId: "1", prioridade: 6 },
            { postoId: "3", prioridade: 7 }
        ]
    },
    {
        id: "12", nome: "Kaian Rodrigues", email: "kaian.rodrigues@emailficticio.com", telefone: "(51) 98345-6789", dataAdmissao: new Date("2025-01-20"), diasDeFolga: ["terça-feira", "quinta-feira"],
        preferenciasPostos: [
            { postoId: "3", prioridade: 2 },
            { postoId: "4", prioridade: 5 }
        ]
    },
]

export const postosMock: Posto[] = [
    { id: "1", nome: "Posto 1", alocacaoMaxima: 3, localizacao: "Praia Central", numero: 1 },
    { id: "2", nome: "Posto 2", alocacaoMaxima: 3, localizacao: "Praia Norte", numero: 2 },
    { id: "3", nome: "Posto 3", alocacaoMaxima: 4, localizacao: "Praia Sul", numero: 3 },
    { id: "4", nome: "Posto 4", alocacaoMaxima: 3, localizacao: "Canto Direito", numero: 4 }
]

export const alocacoesMock: AlocacaoDiaria[] = [
    {id: "1", data: new Date(2025, 2, 14), guardaVidasId: 1, postoId: 2 },
    {id: "2", data: new Date(2025, 2, 14), guardaVidasId: 2, postoId: 2 },

    {id: "3", data: new Date(2025, 2, 14), guardaVidasId: 3, postoId: 4 },
    {id: "4", data: new Date(2025, 2, 14), guardaVidasId: 4, postoId: 4 },

    {id: "5", data: new Date(2025, 2, 14), guardaVidasId: 5, postoId: 1 },
    {id: "6", data: new Date(2025, 2, 14), guardaVidasId: 6, postoId: 1 },
    {id: "7", data: new Date(2025, 2, 14), guardaVidasId: 7, postoId: 1 },
    {id: "8", data: new Date(2025, 2, 14), guardaVidasId: 8, postoId: 1 },

    {id: "9", data: new Date(2025, 2, 14), guardaVidasId: 9, postoId: 3 },
    {id: "10", data: new Date(2025, 2, 14), guardaVidasId: 10, postoId: 3 },
    {id: "11", data: new Date(2025, 2, 14), guardaVidasId: 11, postoId: 3 },
    {id: "12", data: new Date(2025, 2, 14), guardaVidasId: 12, postoId: 3 },
]

export const solicitacoes: Solicitacao[] = [
    {
        id: "1",
        guardaVidasId: 1,
        tipo: "dia_indisponivel",
        dataOriginal: new Date("2023-07-15"),
        dataSolicitada: new Date("2023-07-16"),
        motivo: "Compromisso familiar inadiável",
        status: "APROVADA",
        dataCriacao: new Date("2023-07-10"),
        dataAtualizacao: new Date("2023-07-11"),
    },
    {
        id: "2",
        guardaVidasId: 1,
        tipo: "preferencia_posto",
        postoOriginal: 3,
        postoSolicitado: 1,
        motivo: "Preferência por posto mais próximo de casa",
        status: "PENDENTE",
        dataCriacao: new Date("2023-07-12"),
        dataAtualizacao: new Date("2023-07-12"),
    },
    {
        id: "4",
        guardaVidasId: 2,
        tipo: "dia_indisponivel",
        dataOriginal: new Date("2023-07-22"),
        dataSolicitada: new Date("2023-07-23"),
        motivo: "Evento familiar",
        status: "PENDENTE",
        dataCriacao: new Date("2023-07-08"),
        dataAtualizacao: new Date("2023-07-08"),
    },
]

/*export function obterNomeGuardaVidas(id: number): string {
    if (id === dadosGuardaVidas.id) return dadosGuardaVidas.nome

    const gv = outrosGuardaVidas.find((g) => g.id === id)
    return gv ? gv.nome : "Desconhecido"
}

export function obterNomePosto(id: number): string {
    const posto = postos.find((p) => p.id === id)
    return posto ? posto.nome : "Desconhecido"
}*/

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
