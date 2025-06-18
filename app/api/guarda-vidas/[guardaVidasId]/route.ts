import { NextResponse, NextRequest } from 'next/server'
import { getAlocacoesDiariasByGuardaVidasId } from '@/services/guarda-vidas-service';

export async function GET(
    request: NextRequest,
    { params }: { params: { guardaVidasId: string } },
) {
    try {
        const guardaVidasId = parseInt(params.guardaVidasId)
        if (isNaN(guardaVidasId)) {
            return NextResponse.json({error: 'ID do guarda-vidas inválido'}, {status: 400})
        }

        const {searchParams} = new URL(request.url)
        const dataParam = searchParams.get('data')
        const data = dataParam ? new Date(dataParam) : undefined

        const alocacoes = await getAlocacoesDiariasByGuardaVidasId(guardaVidasId, data)
        return NextResponse.json(alocacoes)
    } catch (error) {
        console.error('Erro ao buscar alocações diárias:', error)
        return NextResponse.json(
            {error: 'Erro ao buscar alocações diárias'},
            {status: 500},
        )
    }
}