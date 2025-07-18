'use client';

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, Edit} from "lucide-react"
import Link from "next/link"
import {useParams} from "next/navigation"
import BackButton from "@/components/utils/back-button";
import {formatarData, formatarDiaSemana, obterNomePosto} from "@/lib/utils";
import {useGetGuardaVidasById} from "@/hooks/api/guarda-vidas/use-get-guarda-vidas-by-id";
import {Badge} from "@/components/ui/badge";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import FullscreenLoader from "@/components/utils/fullscreen-loader";

export default function DetalhesGuardaVidas () {

    const params = useParams();
    const id = params.id as string;

    const {data: guardaVida, isLoading: isLoadingGuardaVidas} = useGetGuardaVidasById(id);
    const {data: postos, isLoading: isLoadingPostos} = useGetPostos();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <BackButton href={"/admin/guarda-vidas"}/>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{guardaVida?.nome ?? "-------"}</h1>
                    <p className="text-muted-foreground">Detalhes e preferências do guarda-vidas.</p>
                </div>
                <div className="ml-auto">
                    <Button asChild>
                        <Link href={`/admin/guarda-vidas/${id}/editar`}>
                            <Edit className="mr-2 h-4 w-4"/>
                            Editar
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Informações Pessoais</CardTitle>
                        <CardDescription>Dados cadastrais do guarda-vidas</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap space-x-20">
                        <div className={"space-y-3"}>
                          <div className="gap-2 flex">
                            <div className="text-sm font-medium text-muted-foreground">Nome:</div>
                            <div>{guardaVida?.nome ?? "------------"}</div>
                          </div>
                          <div className="gap-2 flex items-center justify-start">
                            <div className="text-sm font-medium text-muted-foreground">Email:</div>
                            <div>{guardaVida?.email ?? "------------------"}</div>
                          </div>
                        </div>

                        <div className={"space-y-3"}>
                          <div className="gap-2 flex items-center justify-start">
                            <div className="text-sm font-medium text-muted-foreground">Telefone:</div>
                            <div>{guardaVida?.telefone ?? "-------------"}</div>
                          </div>
                          <div className="gap-2 flex items-center justify-start">
                            <div className="text-sm font-medium text-muted-foreground">Admissão:</div>
                            <div>{guardaVida?.perfilGuardaVidas?.dataAdmissao ? new Date(guardaVida.perfilGuardaVidas.dataAdmissao).toLocaleDateString("pt-BR") : "---------"}</div>
                          </div>
                        </div>

                        <div>
                            <div className="text-sm font-medium text-muted-foreground mb-2">Folgas Fixas:</div>
                            <div className="flex flex-wrap gap-2">
                                {guardaVida?.perfilGuardaVidas?.diasDeFolga && guardaVida.perfilGuardaVidas.diasDeFolga.length > 0 ? (
                                    guardaVida.perfilGuardaVidas.diasDeFolga.map(dia => (
                                        <Badge key={dia} variant="secondary">{formatarDiaSemana(dia)}</Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">{!isLoadingPostos ? "Nenhuma folga fixa registrada." : "-------"}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="preferencias">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preferencias">Preferências de Postos</TabsTrigger>
                    <TabsTrigger value="indisponibilidade">Dias Indisponíveis</TabsTrigger>
                </TabsList>

                <TabsContent value="preferencias" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências de Postos</CardTitle>
                            <CardDescription>Prioridade de alocação em cada posto (0-10)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {guardaVida?.perfilGuardaVidas?.preferenciasPostos && guardaVida?.perfilGuardaVidas.preferenciasPostos
                                    .sort((a, b) => b.prioridade - a.prioridade)
                                    .map((pref) => (
                                        <div key={pref.postoId} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                {postos && <div className="font-medium">{obterNomePosto(postos, pref.postoId)}</div>}
                                                <div
                                                    className="text-muted-foreground">Prioridade: {pref.prioridade}/10
                                                </div>
                                            </div>
                                            <Progress value={pref.prioridade * 10}/>
                                        </div>
                                    ))
                                }
                                {(!guardaVida?.perfilGuardaVidas?.preferenciasPostos || guardaVida.perfilGuardaVidas.preferenciasPostos.length === 0) &&
                                    <div className="text-center py-6 text-muted-foreground">
                                        Nenhuma preferência de posto definida.
                                    </div>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="indisponibilidade" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dias Indisponíveis</CardTitle>
                            <CardDescription>Datas em que o guarda-vidas não pode trabalhar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {guardaVida?.perfilGuardaVidas?.diasIndisponiveis && guardaVida?.perfilGuardaVidas.diasIndisponiveis.length > 0 ? (
                                <div className="space-y-4">
                                    {guardaVida.perfilGuardaVidas.diasIndisponiveis.map((dia, index) => (
                                        <div key={index}
                                             className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                <Calendar className="h-5 w-5"/>
                                            </div>
                                            <div>
                                                <div className="font-medium">{formatarData(dia.data)}</div>
                                                <div className="text-sm text-muted-foreground">{!!dia.motivo ? dia.motivo : "Sem motivo"}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground">Nenhum dia indisponível
                                    registrado.</div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {(isLoadingPostos || isLoadingGuardaVidas) && <FullscreenLoader/>}
        </div>
    )
}
