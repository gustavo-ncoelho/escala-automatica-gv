"use client"

import { useRouter } from "next/navigation"
import {Posto, PostoCriacao} from "@/types/guarda-vidas";
import PostosForm from "@/components/admin/postos/postos-form";
import {useCreatePosto} from "@/hooks/api/postos/use-create-posto";
import {toast} from "@/hooks/utils/use-toast";

export default function NovoPostoPage() {
    const router = useRouter();
    const {mutateAsync} = useCreatePosto();


    const handleSubmit = async (data: PostoCriacao) => {
        try {
            await mutateAsync(data);
            toast.success("Posto criado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao criar um posto");
        }

        router.push("/admin/postos")
    }

    const handleCancel = () => {
        router.push("/admin/postos")
    }

    return (
        <>
            <PostosForm onSubmitCriacao={handleSubmit} onCancel={handleCancel} isEditing={false} />
        </>
    )
}
