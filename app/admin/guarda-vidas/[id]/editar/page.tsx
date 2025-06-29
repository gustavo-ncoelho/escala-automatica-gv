"use client";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Slider} from "@/components/ui/slider"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {postosMock} from "@/utils/dados-simulados"
import {Calendar, Plus, Trash} from "lucide-react"
import Link from "next/link"
import {useParams, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import BackButton from "@/components/utils/back-button";
import {useUpdateGuardaVidas} from "@/hooks/api/guarda-vidas/use-update-guarda-vidas";
import {useGetGuardaVidasById} from "@/hooks/api/guarda-vidas/use-get-guarda-vidas-by-id";
import {toast} from "sonner";
import {DiaDaSemana} from "@/types/guarda-vidas";
import {Checkbox} from "@/components/ui/checkbox";
import {diasDaSemanaOpcoes} from "@/lib/utils";

export default function EditarGuardaVidas() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const {data: guardaVida} = useGetGuardaVidasById(id);
    const [isLoading, setIsLoading] = useState(true);
    const [preferencias, setPreferencias] = useState({} as Record<string, number>);
    const [diasIndisponiveis, setDiasIndisponiveis] = useState([] as { data: string; motivo?: string }[]);
    const [diasDeFolga, setDiasDeFolga] = useState<DiaDaSemana[]>([]);
    const {mutateAsync} = useUpdateGuardaVidas();

    useEffect(() => {
        if (!guardaVida) {
            router.push("/admin/guarda-vidas")
        } else {
            if (guardaVida.perfilGuardaVidas?.preferenciasPostos) {
                setPreferencias(
                    guardaVida.perfilGuardaVidas.preferenciasPostos.reduce(
                        (acc, pref) => {
                            acc[pref.postoId] = pref.prioridade
                            return acc
                        },
                        {} as Record<string, number>,
                    ),
                )
            }

            if (guardaVida.perfilGuardaVidas?.diasIndisponiveis) {
                setDiasIndisponiveis(
                    guardaVida.perfilGuardaVidas?.diasIndisponiveis.map((dia) => ({
                        data: dia.data.toISOString().split("T")[0],
                        motivo: dia.motivo,
                    })),
                );
            }

            if (guardaVida.perfilGuardaVidas?.diasDeFolga) {
                setDiasDeFolga(guardaVida.perfilGuardaVidas.diasDeFolga as DiaDaSemana[]);
            }

            setIsLoading(false)
        }
    }, [guardaVida, router])

    if (isLoading) {
        return <div>Carregando...</div>
    }

    async function handleSalvar() {
        if (guardaVida && guardaVida.perfilGuardaVidas) {
            const preferenciasFormatadas = Object.entries(preferencias).map(([postoId, prioridade]) => ({
                postoId: postoId,
                prioridade: prioridade
            }));
            const diasIndisponiveisFormatados = diasIndisponiveis
                .filter(dia => dia.data)
                .map(dia => ({
                    ...dia,
                    data: new Date(`${dia.data}T12:00:00Z`)
                }));
            try {
                await mutateAsync({
                    id: guardaVida.id, data: {
                        ...guardaVida,
                        dataAdmissao: new Date(guardaVida.perfilGuardaVidas?.dataAdmissao),
                        diasDeFolga: diasDeFolga,
                        preferenciasPostos: preferenciasFormatadas,
                        diasIndisponiveis: diasIndisponiveisFormatados
                    }
                });
                toast.success("Guarda-vidas atualizado com sucesso!");
                router.push(`/admin/guarda-vidas`);
                router.refresh();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
                toast.error(`Falha ao atualizar: ${errorMessage}`);
            }
        } else {
            console.log("Erro ao atualizar");
        }
    }

    const adicionarDiaIndisponivel = () => {
        setDiasIndisponiveis([...diasIndisponiveis, {data: "", motivo: ""}])
    }

    const removerDiaIndisponivel = (index: number) => {
        setDiasIndisponiveis(diasIndisponiveis.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <BackButton href={"/admin/guarda-vidas"}/>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar {guardaVida?.nome}</h1>
                    <p className="text-muted-foreground">Atualize as preferências e configurações do guarda-vidas.</p>
                </div>
            </div>

            <Tabs defaultValue="preferencias">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preferencias">Preferências de Postos</TabsTrigger>
                    <TabsTrigger value="indisponibilidade">Dias Indisponíveis</TabsTrigger>
                    <TabsTrigger value="diasDeFolga">Dias de Folga</TabsTrigger>
                </TabsList>

                <TabsContent value="preferencias" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências de Postos</CardTitle>
                            <CardDescription>Defina a prioridade para cada posto (0-10)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {postosMock.map((posto) => (
                                    <div key={posto.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor={`posto-${posto.id}`}>{posto.nome}</Label>
                                            <span
                                                className="text-sm font-medium">{preferencias[posto.id] || 0}/10</span>
                                        </div>
                                        <Slider
                                            id={`posto-${posto.id}`}
                                            min={0}
                                            max={10}
                                            step={1}
                                            value={[preferencias[posto.id] || 0]}
                                            onValueChange={(value) => {
                                                setPreferencias({
                                                    ...preferencias,
                                                    [posto.id]: value[0],
                                                })
                                            }}
                                        />
                                    </div>
                                ))}
                                {(!postosMock || postosMock.length === 0 ) &&
                                    <div className="text-center py-6 text-muted-foreground">
                                        Nenhuma preferência de posto definida.  Clique em "Adicionar" para incluir.
                                    </div>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="indisponibilidade" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Dias Indisponíveis</CardTitle>
                                <CardDescription>Datas em que o guarda-vidas não pode trabalhar</CardDescription>
                            </div>
                            <Button onClick={adicionarDiaIndisponivel} size="sm">
                                <Plus className="mr-2 h-4 w-4"/>
                                Adicionar
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {diasIndisponiveis.map((dia, index) => (
                                    <div key={index}
                                         className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                            <Calendar className="h-5 w-5"/>
                                        </div>
                                        <div className="flex-1 grid gap-2">
                                            <div className="grid grid-cols-[1fr_auto] gap-2">
                                                <Input
                                                    type="date"
                                                    value={dia.data}
                                                    onChange={(e) => {
                                                        const novosDias = [...diasIndisponiveis]
                                                        novosDias[index].data = e.target.value
                                                        setDiasIndisponiveis(novosDias)
                                                    }}
                                                />
                                                <Button variant="ghost" size="icon"
                                                        onClick={() => removerDiaIndisponivel(index)}>
                                                    <Trash className="h-4 w-4"/>
                                                    <span className="sr-only">Remover</span>
                                                </Button>
                                            </div>
                                            <Input
                                                placeholder="Motivo"
                                                value={dia.motivo}
                                                onChange={(e) => {
                                                    const novosDias = [...diasIndisponiveis]
                                                    novosDias[index].motivo = e.target.value
                                                    setDiasIndisponiveis(novosDias)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {diasIndisponiveis.length === 0 && (
                                    <div className="text-center py-6 text-muted-foreground">
                                        Nenhum dia indisponível registrado. Clique em "Adicionar" para incluir.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="diasDeFolga" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dias de Folga Fixos</CardTitle>
                            <CardDescription>
                                Selecione os dias da semana em que o guarda-vidas terá folga recorrente.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {diasDaSemanaOpcoes.map((dia) => (
                                    <div key={dia.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={dia.id}
                                            checked={diasDeFolga.includes(dia.id as DiaDaSemana)}
                                            onCheckedChange={(checked) => {
                                                const diaId = dia.id as DiaDaSemana;
                                                if (checked) {
                                                    setDiasDeFolga([...diasDeFolga, diaId]);
                                                } else {
                                                    setDiasDeFolga(diasDeFolga.filter((d) => d !== diaId));
                                                }
                                            }}
                                        />
                                        <label htmlFor={dia.id} className="text-sm font-medium leading-none">
                                            {dia.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                    <Link href={`/admin/guarda-vidas/${id}`}>Cancelar</Link>
                </Button>
                <Button onClick={() => handleSalvar()}>Salvar Alterações</Button>
            </div>
        </div>
    )
}
