import {Cargo} from "./usuario";
import {DiaDaSemana} from "@prisma/client";

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