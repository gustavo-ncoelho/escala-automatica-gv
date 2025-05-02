export interface PreferenciaPosto {
    postoId: number
    justificativa: string
    prioridade: number
}

export interface ColaboradorNaoPreferido {
    guardaVidasId: number
    motivo: string
}

export interface DiaIndisponivel {
    data: Date
    motivo: string
}

interface Estatisticas {
    diasTrabalhados: number
    diasRestantes: number
}

export interface GuardaVidas {
    id: number
    nome: string
    email: string
    telefone: string
    dataAdmissao: Date
    preferenciasPostos: PreferenciaPosto[]
    diasIndisponiveis: DiaIndisponivel[]
    colaboradoresNaoPreferidos: ColaboradorNaoPreferido[]
    estatisticas: Estatisticas
}

export interface Posto {
    id: number
    nome: string
    localizacao: string
}
