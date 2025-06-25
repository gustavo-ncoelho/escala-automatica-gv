import { Cargo } from "./usuario";
import {DiaDaSemana} from "@/types/guarda-vidas";

export type RegisterData = {
    email: string;
    nome: string;
    senha: string;
    telefone?: string;
    cargo: Cargo;
    data_admissao?: Date;
    diasDeFolga?: DiaDaSemana[];
    preferenciasPostos?: PreferenciaPostoInput[];
    diasIndisponiveis?: DiaIndisponivelInput[];
}