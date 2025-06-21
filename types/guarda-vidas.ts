export type PreferenciaPosto = {
    postoId: number
    justificativa: string
    prioridade: number
}

export type DiaIndisponivel = {
    data: Date
    motivo?: string
}

type Estatisticas = {
    diasTrabalhados: number
    diasRestantes: number
}

export type GuardaVidas = {
    id: number
    nome: string
    email: string
    telefone?: string;
    dataAdmissao: Date
    preferenciasPostos?: PreferenciaPosto[]
    diasIndisponiveis?: DiaIndisponivel[]
    estatisticas?: Estatisticas
}

export type GuardaVidasCriacao = Omit<GuardaVidas, "id" | "estatisticas">
export type GuardaVidasEscala = Omit<GuardaVidas, "dataAdmissao" | "email" | "telefone">

export type Posto = {
    id: number
    nome: string
    numero: number;
    alocacaoMaxima: number;
    localizacao: string
}
