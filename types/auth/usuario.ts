export type Cargo = "GUARDA_VIDAS" | "COMANDANTE"

export type Usuario = {
    id: string;
    login: string;
    cargo: Cargo;
}