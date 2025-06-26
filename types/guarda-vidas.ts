export type DiaDaSemana = "segunda" | "terça-feira" | "quarta-feira" | "quinta-feira" | "sexta-feira" | "sabado" | "domingo";

export type PreferenciaPosto = {
    postoId: string
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

export type GuardaVidasCriacao = Omit<GuardaVidas, "id">

export type GuardaVidasEscala = Omit<GuardaVidas, "dataAdmissao" | "email" | "telefone">

export type GuardaVidas = {
    id: string
    nome: string
    email: string
    telefone?: string;
    dataAdmissao: Date
    diasDeFolga?: DiaDaSemana[],
    preferenciasPostos?: PreferenciaPosto[]
    diasIndisponiveis?: DiaIndisponivel[]
    estatisticas?: Estatisticas
}

export type PostoCriacao = Omit<Posto, "id">

export type Posto = {
    id: string
    nome: string
    numero: number;
    alocacaoMaxima: number;
    localizacao: string
}
