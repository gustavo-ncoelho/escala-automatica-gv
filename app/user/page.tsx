"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {CalendarioMensal} from "@/components/user/calendario/calendario-mensal"
import {ListaEscalas} from "@/components/user/calendario/lista-escalas"
import {CalendarDays, List} from "lucide-react"
import {useState} from "react"
import {dadosGuardaVidas} from "@/utils/dados-simulados"

export default function CalendarioPage() {
    const [visualizacao, setVisualizacao] = useState<"calendario" | "lista">("calendario")
    const [mes, setMes] = useState("7")
    const [ano, setAno] = useState("2023")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Olá, {dadosGuardaVidas.nome}</h1>
                <p className="text-muted-foreground">Visualize sua escala mensal de trabalho.</p>
            </div>

            <Card>
                <CardContent className="p-4 md:p-6">
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
                                        <SelectItem value="2022">2022</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant={visualizacao === "calendario" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setVisualizacao("calendario")}
                                >
                                    <CalendarDays className="h-4 w-4"/>
                                    <span className="sr-only">Visualização de Calendário</span>
                                </Button>
                                <Button
                                    variant={visualizacao === "lista" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setVisualizacao("lista")}
                                >
                                    <List className="h-4 w-4"/>
                                    <span className="sr-only">Visualização de Lista</span>
                                </Button>
                            </div>
                        </div>

                        {visualizacao === "calendario" ? (
                            <CalendarioMensal mes={Number.parseInt(mes)} ano={Number.parseInt(ano)}/>
                        ) : (
                            <ListaEscalas mes={Number.parseInt(mes)} ano={Number.parseInt(ano)}/>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
