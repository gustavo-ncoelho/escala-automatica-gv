"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CalendarioEscala} from "@/components/admin/escala/calendario-escala"
import {TabelaEscala} from "@/components/admin/escala/tabela-escala"
import {Calendar, Download, RefreshCw} from "lucide-react"
import {useState} from "react"

export default function EscalaPage() {
    const [visualizacao, setVisualizacao] = useState("calendario")
    const [mes, setMes] = useState("7")
    const [ano, setAno] = useState("2023")

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Escala</h1>
                    <p className="text-muted-foreground">Visualize e gerencie a escala mensal dos guarda-vidas.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4"/>
                        Exportar
                    </Button>
                    <Button>
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        Gerar Escala
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Select value={mes} onValueChange={setMes}>
                                    <SelectTrigger className="w-[180px]">
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
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Selecione o ano"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2022">2022</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="ml-auto">
                                <Tabs value={visualizacao} onValueChange={setVisualizacao}>
                                    <TabsList>
                                        <TabsTrigger value="calendario">
                                            <Calendar className="mr-2 h-4 w-4"/>
                                            Calendário
                                        </TabsTrigger>
                                        <TabsTrigger value="tabela">
                                            <Calendar className="mr-2 h-4 w-4"/>
                                            Tabela
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        {visualizacao === "calendario" ? (
                            <CalendarioEscala mes={Number.parseInt(mes)} ano={Number.parseInt(ano)}/>
                        ) : (
                            <TabelaEscala mes={Number.parseInt(mes)} ano={Number.parseInt(ano)}/>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
