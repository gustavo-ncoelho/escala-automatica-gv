// src/app/api/guarda-vidas/[guardaVidasId]/escala-mensal/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { getEscalaMensalByGuardaVidasId } from '@/services/guarda-vidas-service';

export async function GET(
    request: NextRequest,
    { params }: { params: { guardaVidasId: string } },
) {
    try {
        const guardaVidasId = parseInt(params.guardaVidasId)
        if (isNaN(guardaVidasId)) {
            return NextResponse.json({ error: 'ID do guarda-vidas inválido' }, { status: 400 })
        }

        const { searchParams } = new URL(request.url)
        const mesParam = searchParams.get('mes')
        const anoParam = searchParams.get('ano')

        if (!mesParam || !anoParam) {
            return NextResponse.json(
                { error: 'Parâmetros "mes" e "ano" são obrigatórios' },
                { status: 400 },
            )
        }

        const mes = parseInt(mesParam)
        const ano = parseInt(anoParam)

        if (isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12) {
            return NextResponse.json({ error: 'Mês ou ano inválidos' }, { status: 400 })
        }

        const escalaMensal = await getEscalaMensalByGuardaVidasId(guardaVidasId, mes, ano)

        if (!escalaMensal) {
            return NextResponse.json({ message: 'Escala mensal não encontrada para o período.' }, { status: 404 })
        }

        return NextResponse.json(escalaMensal)
    } catch (error) {
        console.error('Erro ao buscar escala mensal:', error)
        return NextResponse.json({ error: 'Erro ao buscar escala mensal' }, { status: 500 })
    }
}