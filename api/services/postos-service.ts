import { prisma } from '@/lib/prisma';
import {PostoCriacao} from "@/types/guarda-vidas";

export type UpdatePostoData = Partial<PostoCriacao>;

export async function getPostos() {
    return prisma.posto.findMany({
        orderBy: {
            numero: 'asc',
        },
        include: {
            datasFechadas: true,
        }
    });
}

export async function getPostoById(id: string) {
    return prisma.posto.findUniqueOrThrow({
        where: { id },
        include: {
            datasFechadas: true,
        }
    });
}

export async function createPosto(data: PostoCriacao) {
    const existingPosto = await prisma.posto.findFirst({
        where: { OR: [{ nome: data.nome }, { numero: data.numero }] }
    });

    if (existingPosto) {
        throw new Error("Já existe um posto com este nome ou número.");
    }

    const { datasFechadas, ...postoData } = data;

    return prisma.posto.create({
        data: {
            ...postoData,
            datasFechadas: {
                create: datasFechadas
            }
        }
    });
}

export async function updatePosto(id: string, data: UpdatePostoData) {
    const { datasFechadas, ...postoData } = data;

    return prisma.posto.update({
        where: { id },
        data: {
            ...postoData,
            datasFechadas: {
                deleteMany: {},
                create: datasFechadas
            }
        },
    });
}

export async function deletePosto(id: string) {
    return prisma.posto.delete({
        where: { id },
    });
}