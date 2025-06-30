"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Edit, MapPin, Plus, Search, Trash2, Users} from "lucide-react"
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {useDeletePosto} from "@/hooks/api/postos/use-delete-posto";
import { toast } from "sonner"

export default function PostosPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const {mutateAsync: deletarPosto} = useDeletePosto();
    const {data: postos} = useGetPostos();

    const filteredPostos = postos?.filter(
        (posto) =>
            posto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            posto.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            posto.numero.toString().includes(searchTerm),
    )

    const handleDelete = async (id: string) => {
        try {
            await deletarPosto(id);
            toast.success("Posto removido com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao remover posto");
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Gerenciamento de Postos</h1>
                    <p className="text-muted-foreground">Visualize e gerencie todos os postos de guarda-vidas</p>
                </div>
                <Link href="/admin/postos/novo">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Posto
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nome, localização ou número..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPostos?.map((posto) => (
                    <Card key={posto.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                    <CardDescription>Posto #{posto.numero}</CardDescription>
                                </div>
                                <Badge variant="secondary">
                                    <Users className="w-3 h-3 mr-1" />
                                    {posto.alocacaoMaxima}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">{posto.localizacao}</p>
                            </div>

                            <div className="flex gap-2">
                                <Link href={`/admin/postos/${posto.id}/editar`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Editar
                                    </Button>
                                </Link>
                                <Button
                                    variant="trash"
                                    size="sm"
                                    onClick={() => handleDelete(posto.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPostos?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        {searchTerm ? "Nenhum posto encontrado com os critérios de busca." : "Nenhum posto cadastrado ainda."}
                    </p>
                    {!searchTerm && (
                        <Link href="postos/novo">
                            <Button className="mt-4">
                                <Plus className="w-4 h-4 mr-2" />
                                Cadastrar Primeiro Posto
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}
