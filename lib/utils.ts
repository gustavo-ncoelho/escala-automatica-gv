import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/escala";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isServer(): boolean {
  return typeof window == "undefined";
}

export function isClient(): boolean {
  return typeof window !== "undefined";
}

export const getNomeMes = (mes: number) => {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  return meses[mes - 1]
}

const getDiasNoMes = (mes: number, ano: number) => {
  return new Date(ano, mes, 0).getDate()
}

const mes = 3;          // TODO -> MOCADO
const ano = 2026;       // TODO -> MOCADO

export const contarGuardaVidasPorDia = (dia: number, alocacoes: AlocacaoDiaria[]) => {
  return alocacoes.filter(
      (alocacao) =>
          alocacao.data.getDate() === dia && alocacao.data.getMonth() === mes - 1 && alocacao.data.getFullYear() === ano,
  ).length
}