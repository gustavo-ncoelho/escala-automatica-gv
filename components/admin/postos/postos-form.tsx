"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {Posto} from "@/types/guarda-vidas";
import BackButton from "@/components/utils/back-button";

interface PostoFormProps {
    posto?: Posto
    onSubmit: (data: Omit<Posto, "id">) => void
    onCancel: () => void
    isEditing?: boolean
}

export default function PostosForm({ posto, onSubmit, onCancel, isEditing = false }: PostoFormProps) {
    const [formData, setFormData] = useState({
        nome: posto?.nome || "",
        numero: posto?.numero || 0,
        alocacaoMaxima: posto?.alocacaoMaxima || 1,
        localizacao: posto?.localizacao || "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.nome.trim()) {
            newErrors.nome = "Nome é obrigatório"
        }

        if (formData.numero <= 0) {
            newErrors.numero = "Número deve ser maior que zero"
        }

        if (formData.alocacaoMaxima <= 0) {
            newErrors.alocacaoMaxima = "Alocação máxima deve ser maior que zero"
        }

        if (!formData.localizacao.trim()) {
            newErrors.localizacao = "Localização é obrigatória"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className={"flex gap-6 items-start"}>
                    <BackButton href={"/admin/postos"}/>
                    <div>
                        <CardTitle>{isEditing ? "Editar Posto" : "Cadastrar Novo Posto"}</CardTitle>
                        <CardDescription>
                            {isEditing ? "Atualize as informações do posto" : "Preencha os dados para criar um novo posto"}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome do Posto</Label>
                            <Input
                                id="nome"
                                value={formData.nome}
                                onChange={(e) => handleInputChange("nome", e.target.value)}
                                placeholder="Ex: Posto Central"
                                className={errors.nome ? "border-red-500" : ""}
                            />
                            {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                                id="numero"
                                type="number"
                                value={formData.numero}
                                onChange={(e) => handleInputChange("numero", Number.parseInt(e.target.value) || 0)}
                                placeholder="1"
                                min="1"
                                className={errors.numero ? "border-red-500" : ""}
                            />
                            {errors.numero && <p className="text-sm text-red-500">{errors.numero}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="alocacaoMaxima">Alocação Máxima</Label>
                        <Input
                            id="alocacaoMaxima"
                            type="number"
                            value={formData.alocacaoMaxima}
                            onChange={(e) => handleInputChange("alocacaoMaxima", Number.parseInt(e.target.value) || 1)}
                            placeholder="4"
                            min="1"
                            className={errors.alocacaoMaxima ? "border-red-500" : ""}
                        />
                        {errors.alocacaoMaxima && <p className="text-sm text-red-500">{errors.alocacaoMaxima}</p>}
                        <p className="text-sm text-muted-foreground">
                            Número máximo de guarda-vidas que podem ser alocados neste posto
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="localizacao">Localização</Label>
                        <Textarea
                            id="localizacao"
                            value={formData.localizacao}
                            onChange={(e) => handleInputChange("localizacao", e.target.value)}
                            placeholder="Ex: Praia de Copacabana - Setor A"
                            className={errors.localizacao ? "border-red-500" : ""}
                            rows={3}
                        />
                        {errors.localizacao && <p className="text-sm text-red-500">{errors.localizacao}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">
                            {isEditing ? "Atualizar Posto" : "Cadastrar Posto"}
                        </Button>
                        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
