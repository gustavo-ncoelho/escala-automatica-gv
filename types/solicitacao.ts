export type TipoSolicitacao = "PREFERENCIA_POSTO" | "DIA_INDISPONIVEL"
export type StatusSolicitacao = "pendente" | "aprovada" | "rejeitada"

export type Solicitacao = {
  id: string
  guardaVidasId: string
  tipo: TipoSolicitacao
  dataOriginal?: Date
  postoOriginal?: string
  dataSolicitada?: Date
  postoSolicitado?: string
  motivo: string
  status: StatusSolicitacao
  dataCriacao: Date
  dataAtualizacao: Date
}

export type SolicitacaoCriacao = Omit<Solicitacao, "id">;
