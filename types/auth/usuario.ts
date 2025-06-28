import {GuardaVidas} from "@/types/guarda-vidas";

export type Cargo = "GUARDA_VIDAS" | "COMANDANTE"

export type Usuario = {
    id: string;
    email: string;
    nome: string;
    cargo: Cargo;
    telefone?: string;
    dataCriacao: Date;
    dataAtualizacao?: Date;
    perfilGuardaVidas?: GuardaVidas;
}

export type UsuarioPayload = {
    id: string;
    nome: string;
    email: string;
    cargo: Cargo;
}