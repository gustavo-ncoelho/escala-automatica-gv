export type DiaDaSemana = "segunda" | "terça-feira" | "quarta-feira" | "quinta-feira" | "sexta-feira" | "sabado" | "domingo";

export type PreferenciaPosto = {
    postoId: number
    justificativa?: string
    prioridade: number
}

export type DiaIndisponivel = {
    data: Date
    motivo?: string
}

type Estatisticas = {
    diasTrabalhadosNaTemporada: number,
    postoMaisTrabalhado: number,
    diasDaSemanaMaisFolgado: DiaDaSemana | DiaDaSemana[]
}

export type GuardaVidasCriacao = Omit<GuardaVidas, "id" | "estatisticas">

export type GuardaVidasEscala = Omit<GuardaVidas, "dataAdmissao" | "email" | "telefone">

export type GuardaVidas = {
    id: number
    nome: string
    email: string
    telefone?: string;
    dataAdmissao: Date
    diasDeFolga?: DiaDaSemana[],
    preferenciasPostos?: PreferenciaPosto[]
    diasIndisponiveis?: DiaIndisponivel[]
    estatisticas?: Estatisticas
}

export type Posto = {
    id: number
    nome: string
    numero: number;
    alocacaoMaxima: number;
    localizacao: string
}
