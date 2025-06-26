import { prisma } from '@/lib/prisma';
import {PostoCriacao} from "@/types/guarda-vidas";

export type UpdatePostoData = Partial<PostoCriacao>;

export async function getPostos() {
    return prisma.posto.findMany({
        orderBy: {
            numero: 'asc',
        },
    });
}

export async function createPosto(data: PostoCriacao) {
    const existingPosto = await prisma.posto.findFirst({
        where: { OR: [{ nome: data.nome }, { numero: data.numero }] }
    });

    if (existingPosto) {
        throw new Error("Já existe um posto com este nome ou número.");
    }

    return prisma.posto.create({ data });
}

export async function updatePosto(id: string, data: UpdatePostoData) {
    return prisma.posto.update({
        where: { id },
        data,
    });
}

export async function deletePosto(id: string) {
    return prisma.posto.delete({
        where: { id },
    });
}