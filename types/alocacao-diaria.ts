export type AlocacaoDiaria = {
  id: string
  data: Date
  guardaVidasId: string
  postoId: string
}

export type AlocacaoDiariaCriacao = Omit<AlocacaoDiaria, "id">;