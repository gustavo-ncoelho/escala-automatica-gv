"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {CalendarOff, Edit, MapPin, Plus, Trash2, TrendingUp, Users, XOctagon} from "lucide-react"
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {useDeletePosto} from "@/hooks/api/postos/use-delete-posto";
import {toast} from "sonner"
import {format} from "date-fns"
import {formatarDia} from "@/lib/utils";
import FullscreenLoader from "@/components/utils/fullscreen-loader";
import ConfirmDeleteModal from "@/components/utils/confirm-delete-modal";

export default function PostosPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [postoToDelete, setPostoToDelete] = useState<string | undefined>(undefined);
    const {mutateAsync: deletarPosto} = useDeletePosto();
    const {data: postos, isLoading: isLoadingPostos} = useGetPostos();

    const filteredPostos = postos?.filter(
        (posto) =>
            posto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            posto.localizacao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            posto.numero.toString().includes(searchTerm),
    )

    const handleDelete = async (id: string) => {
        try {
            await deletarPosto(id,{
                onSuccess: () => {
                    toast.success("Posto removido com sucesso!");
                    setPostoToDelete(undefined);
                }
            });
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
                        <Plus className="w-4 h-4 mr-2"/>
                        Novo Posto
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredPostos?.map((posto) => (
                    <>
                        <Card key={posto.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                        <CardDescription>Posto #{posto.numero}</CardDescription>
                                    </div>
                                    <Badge variant="secondary">
                                        <Users className="w-3 h-3 mr-1"/>
                                        {posto.alocacaoMaxima}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"/>
                                    <p className="text-sm text-muted-foreground">{posto.localizacao}</p>
                                </div>

                                <div className="space-y-3 pt-4 border-t flex-grow">
                                    <div className="flex items-center gap-2 text-sm">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                                        <span className="font-medium">Movimento:</span>
                                        <span className="font-semibold">{posto.movimento}/10</span>
                                    </div>

                                    <div className="flex items-start gap-2 text-sm">
                                        <XOctagon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"/>
                                        <span className="font-medium">Folgas Fixas:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {posto.diasFechados && posto.diasFechados.length > 0 ? (
                                                posto.diasFechados.map(dia => <Badge key={dia} variant="outline"
                                                                                     className={"py-0.5 px-1.5 rounded-md"}>{formatarDia(dia)}</Badge>)
                                            ) : (
                                                <span className="text-muted-foreground italic">Nenhuma</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 text-sm">
                                        <CalendarOff className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"/>
                                        <span className="font-medium">Datas Fechadas:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {posto.datasFechadas && posto.datasFechadas.length > 0 ? (
                                                posto.datasFechadas.map((dia, index) => (
                                                    <Badge key={index} variant="destructive"
                                                           className={"py-0.5 px-1.5 rounded-md"}>
                                                        {format(new Date(dia.data), "dd/MM")}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-muted-foreground italic">Nenhuma</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/admin/postos/${posto.id}/editar`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Edit className="w-4 h-4 mr-2"/>
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="trash"
                                        size="sm"
                                        onClick={() => setPostoToDelete(posto.id)}
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </>
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
                                <Plus className="w-4 h-4 mr-2"/>
                                Cadastrar Primeiro Posto
                            </Button>
                        </Link>
                    )}
                </div>
            )}

            {postoToDelete &&
                <ConfirmDeleteModal
                    title={"Excluir posto"}
                    description={"Você tem certeza que deseja excluir este posto ?"}
                    cancelFunction={() => setPostoToDelete(undefined)}
                    deleteFunction={() => handleDelete(postoToDelete)}
                />
            }

            {isLoadingPostos && <FullscreenLoader/>}
        </div>
    )
}
