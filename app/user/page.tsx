"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {CalendarioMensal} from "@/components/user/calendario/calendario-mensal"
import {useState} from "react"
import {useAuthContext} from "@/contexts/auth-context";
import {useGetGuardaVidasById} from "@/hooks/api/guarda-vidas/use-get-guarda-vidas-by-id";
import {converterGVParaGVEscala} from "@/lib/utils";
import {useGetAlocacoesPorGuardaVidas} from "@/hooks/api/alocacao-diaria/use-get-alocacoes-por-guarda-vidas";

export default function CalendarioPage() {
    const dataAtual = new Date();
    const [mes, setMes] = useState(String(dataAtual.getMonth() + 1));
    const [ano, setAno] = useState(String(dataAtual.getFullYear()));

    const {usuario} = useAuthContext();

    const {data: usuarioGuardaVidas} = useGetGuardaVidasById(usuario?.id ?? "");
    const {data: alocacoes} = useGetAlocacoesPorGuardaVidas(usuarioGuardaVidas?.perfilGuardaVidas?.id ?? "");


    return (
        <div className="space-y-6 flex flex-col flex-1">
            <div className={"px-4"}>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Olá, {usuario?.nome}</h1>
                <p className="text-muted-foreground">Visualize sua escala mensal de trabalho.</p>
            </div>

            <Card className={"rounded-none flex-1 flex flex-col"}>
                <CardContent className="p-4 md:p-6 flex-1 flex-col flex">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Select value={mes} onValueChange={setMes}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Selecione o mês"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Janeiro</SelectItem>
                                        <SelectItem value="2">Fevereiro</SelectItem>
                                        <SelectItem value="3">Março</SelectItem>
                                        <SelectItem value="4">Abril</SelectItem>
                                        <SelectItem value="5">Maio</SelectItem>
                                        <SelectItem value="6">Junho</SelectItem>
                                        <SelectItem value="7">Julho</SelectItem>
                                        <SelectItem value="8">Agosto</SelectItem>
                                        <SelectItem value="9">Setembro</SelectItem>
                                        <SelectItem value="10">Outubro</SelectItem>
                                        <SelectItem value="11">Novembro</SelectItem>
                                        <SelectItem value="12">Dezembro</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={ano} onValueChange={setAno}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Selecione o ano"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025">2025</SelectItem>
                                        <SelectItem value="2026">2026</SelectItem>
                                        <SelectItem value="2027">2027</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {usuarioGuardaVidas &&
                            <CalendarioMensal
                                mes={Number.parseInt(mes)}
                                ano={Number.parseInt(ano)}
                                guardaVida={converterGVParaGVEscala(usuarioGuardaVidas)}
                                alocacoes={alocacoes ?? []}
                            />
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
