"use client"

import {useParams, useRouter} from "next/navigation"
import {PostoCriacao} from "@/types/guarda-vidas";
import PostosForm from "@/components/admin/postos/postos-form";
import {useUpdatePosto} from "@/hooks/api/postos/use-update-posto";
import { toast } from "sonner";
import {useGetPostoById} from "@/hooks/api/postos/use-get-posto-by-id";

export default function EditarPostoPage() {

    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const {data: posto} = useGetPostoById(id);
    const {mutateAsync: atualizarPosto} = useUpdatePosto();


    const handleSubmit = async (id: string, data: PostoCriacao) => {
        try {
            await atualizarPosto({id, data});
            toast.success("Posto alterado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao alterar posto");
        }


        router.push("/admin/postos")
    }

    const handleCancel = () => {
        router.push("/admin/postos")
    }


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
            <PostosForm posto={posto} onSubmitUpdate={handleSubmit} onCancel={handleCancel} isEditing={true}/>
        </>
    )
}