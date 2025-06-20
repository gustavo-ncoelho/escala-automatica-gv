import { prisma } from '@/lib/prisma';
import { Cargo } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateTokens } from '@/lib/session/session';

type RegisterUserData = {
    email: string;
    nome: string;
    senha: string;
    telefone?: string;
    cargo: Cargo;
    data_admissao?: Date;
}

export async function registerUser(data: RegisterUserData) {
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
            senha_hash: hashedPassword,
            cargo: data.cargo,
            guarda_vidas: data.cargo === 'GUARDA_VIDAS' ? {
                create: {
                    data_admissao: admissaoDate
                }
            } : undefined
        }
    });

    const { senha_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

type LoginUserData = {
    email: string;
    senha: string;
}

export async function loginUser(data: LoginUserData) {
    const user = await prisma.usuario.findUnique({
        where: { email: data.email }
    });

    if (!user) {
        throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(data.senha, user.senha_hash);

    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas.');
    }

    const tokens = await generateTokens(user);

    const { senha_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
}