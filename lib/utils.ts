import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AlocacaoDiaria} from "@/types/escala";
import { isSameDay } from "date-fns";

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

export const contarGuardaVidasPorDia = (targetDate: Date, alocacoes: AlocacaoDiaria[]): number => {
  if (!targetDate || !alocacoes) {
    return 0;
  }

  const alocacoesDoDia = alocacoes.filter(alocacao =>
      isSameDay(alocacao.data, targetDate)
  );

  return alocacoesDoDia.length;
}