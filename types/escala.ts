export type AlocacaoDiaria = {
  id: string
  data: Date
  guardaVidasId: number
  postoId: number
}

export type EscalaMensal = {
  mes: number
  ano: number
  alocacoes: AlocacaoDiaria[]
}