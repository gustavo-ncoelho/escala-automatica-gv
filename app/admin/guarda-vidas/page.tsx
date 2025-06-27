'use client';

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Plus, Search} from "lucide-react"
import Link from "next/link"
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";

export default function GuardaVidasPage() {

    const {data: listaGuardaVidas} = useGetAllGuardaVidas();

    const layout = "flex justify-center items-center"

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Guarda-Vidas</h1>
                    <p className="text-muted-foreground">Gerencie os guarda-vidas e suas preferências.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/guarda-vidas/novo">
                        <Plus className="mr-2 h-4 w-4"/>
                        Novo Guarda-Vidas
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input type="search" placeholder="Buscar guarda-vidas..." className="pl-8"/>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <div className={layout}>
                                        Nome
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className={layout}>
                                        Email
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className={layout}>
                                        Telefone
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className={layout}>
                                        Data de Admissã
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className={layout}>
                                        Dias Trabalhados
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listaGuardaVidas?.map((gv) => (
                                <TableRow key={gv.id}>
                                    <TableCell className={"font-medium"}>
                                        <div className={layout}>
                                            {gv.nome ?? "--------"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={layout}>
                                            {gv.email ?? "--------"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={layout}>
                                            {gv.telefone ?? "--------"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={layout}>
                                            {gv.dataAdmissao ? gv.dataAdmissao.toLocaleDateString("pt-BR") : "--------"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={layout}>
                                            {gv.estatisticas?.diasTrabalhadosNaTemporada ?? "--------"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button className={layout} variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/guarda-vidas/${gv.id}`}>Detalhes</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
