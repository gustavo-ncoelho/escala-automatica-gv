import {Usuario} from "@/types/auth/usuario";

export type DiaDaSemana = "segunda" | "terca_feira" | "quarta_feira" | "quinta_feira" | "sexta_feira" | "sabado" | "domingo";

export type PreferenciaPosto = {
    postoId: string
    justificativa?: string
    prioridade: number
}

export type DiaIndisponivel = {
    data: Date
    motivo?: string
}

export type Estatisticas = {
    diasTrabalhadosNaTemporada: number,
    postoMaisTrabalhado: number,
    diasDaSemanaMaisFolgado: DiaDaSemana | DiaDaSemana[]
}

export type GuardaVidasCriacao = Omit<GuardaVidas, "id">

export type GuardaVidasEscala = {
    id: string;
    nome: string;
    diasDeFolga?: string[];
    preferenciasPostos?: any[];
    diasIndisponiveis?: any[];
    estatisticas?: any;
};

export type GuardaVidas = {
    id: string
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
    localizacao?: string;
    datasFechadas: DataFechadaPosto[];
    diasFechados: DiaDaSemana[];
    movimento: number;
}

export type DataFechadaPosto = {
    data: Date
    motivo?: string
}

export type RankingItem = {
    guardaVidasId: string;
    nome: string;
    diasTrabalhados: number;
}