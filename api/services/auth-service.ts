import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';
import {generateTokens} from '@/lib/session/session';
import {LoginData} from "@/types/auth/login-data";
import {RegisterData} from "@/types/auth/register-data";

export async function registerUser(data: RegisterData) {
    const existingUser = await prisma.usuario.findUnique({
        where: { email: data.email }
    });

    if (existingUser) {
        throw new Error('Este email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const admissaoDate = data.data_admissao ? new Date(data.data_admissao) : new Date();

    const user = await prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            senhaHash: hashedPassword,
            cargo: data.cargo,
            perfilGuardaVidas: data.cargo === 'GUARDA_VIDAS' ? {
                create: {
                    dataAdmissao: admissaoDate,
                    diasDeFolga: data.diasDeFolga ?? [],
                    preferenciasPostos: {
                        create: data.preferenciasPostos?.map(pref => ({
                            posto: { connect: { id: pref.postoId } },
                            prioridade: pref.prioridade,
                            justificativa: pref.justificativa
                        }))
                    },
                    diasIndisponiveis: {
                        create: data.diasIndisponiveis?.map(dia => ({
                            data: new Date(dia.data),
                            motivo: dia.motivo
                        }))
                    }
                }
            } : undefined
        }
    });

    const { senhaHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function loginUser(data: LoginData) {
    const user = await prisma.usuario.findUnique({
        where: {
            email: data.email,
        },
        include: {
            perfilGuardaVidas: true
        }
    });

    if (!user || !user.senhaHash) {
        throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(data.senha, user.senhaHash);

    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas.');
    }

    const tokens = await generateTokens(user);

    const { senhaHash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
}