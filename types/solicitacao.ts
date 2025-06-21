export type TipoSolicitacao = "preferencia_posto" | "dia_indisponivel"
export type StatusSolicitacao = "pendente" | "aprovada" | "rejeitada"

export type Solicitacao = {
  id: number
  guardaVidasId: number
  tipo: TipoSolicitacao
  dataOriginal?: Date
  postoOriginal?: number
  dataSolicitada?: Date
  postoSolicitado?: number
  colegaNaoPreferido?: number
  motivo: string
  status: StatusSolicitacao
  dataCriacao: Date
  dataAtualizacao: Date
}
