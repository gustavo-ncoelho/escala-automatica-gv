export interface AlocacaoDiaria {
  data: Date
  guardaVidasId: number
  postoId: number
}

export interface EscalaMensal {
  mes: number
  ano: number
  alocacoes: AlocacaoDiaria[]
}
