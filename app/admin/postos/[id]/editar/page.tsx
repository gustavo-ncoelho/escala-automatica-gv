"use client"

import {useParams, useRouter} from "next/navigation"
import { useState, useEffect } from "react"
import {Posto} from "@/types/guarda-vidas";
import {postosMock} from "@/utils/dados-simulados";
import PostosForm from "@/components/admin/postos/postos-form";

export default function EditarPostoPage() {

    const {id} = useParams();
    const router = useRouter()
    const [posto, setPosto] = useState<Posto | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const postoEncontrado = postosMock.find((p) => p.id === id)
        setPosto(postoEncontrado || null)
        setLoading(false)
    }, [id])

    const handleSubmit = (data: Omit<Posto, "id">) => {
        console.log("Atualizando posto:", { id , ...data })

        alert("Posto atualizado com sucesso!")
        router.push("/postos")
    }

    const handleCancel = () => {
        router.push("/postos")
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <p>Carregando...</p>
                </div>
            </div>
        )
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
        <div className="container">
            <PostosForm posto={posto} onSubmit={handleSubmit} onCancel={handleCancel} isEditing={true} />
        </div>
    )
}