import {Cargo} from "@/types/auth/usuario";

export type RegisterData = {
    email: string,
    nome: string,
    senha: string,
    cargo: Cargo,
    telefone?: string
}