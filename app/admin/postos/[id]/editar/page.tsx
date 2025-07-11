"use client"

import {useParams, useRouter} from "next/navigation"
import PostosForm from "@/components/admin/postos/postos-form";
import {useGetPostoById} from "@/hooks/api/postos/use-get-posto-by-id";

export default function EditarPostoPage() {

    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const {data: posto, isLoading} = useGetPostoById(id);

    if (!posto) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Posto não encontrado</h1>
                    <p className="text-muted-foreground mb-4">O posto que você está tentando editar não existe.</p>
                    <button onClick={() => router.push("/postos")} className="text-blue-600 hover:underline">
                        Voltar para lista de postos
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <PostosForm posto={posto} isEditing={true} isLoadingPosto={isLoading}/>
        </>
    )
}