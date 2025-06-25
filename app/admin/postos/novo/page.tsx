"use client"

import { useRouter } from "next/navigation"
import {Posto} from "@/types/guarda-vidas";
import PostosForm from "@/components/admin/postos/postos-form";

export default function NovoPostoPage() {
    const router = useRouter()

    const handleSubmit = (data: Omit<Posto, "id">) => {
        console.log("Cadastrando novo posto:", data)

        alert("Posto cadastrado com sucesso!")
        router.push("/postos")
    }

    const handleCancel = () => {
        router.push("/postos")
    }

    return (
        <div className="container mx-auto">
            <PostosForm onSubmit={handleSubmit} onCancel={handleCancel} isEditing={false} />
        </div>
    )
}
