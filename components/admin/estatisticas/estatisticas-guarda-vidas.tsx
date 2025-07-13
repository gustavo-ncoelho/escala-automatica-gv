"use client";

import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {RankingItem} from "@/types/guarda-vidas";
import FullscreenLoader from "@/components/utils/fullscreen-loader";

interface EstatisticasGuardaVidasProps {
    ranking: RankingItem[];
    isLoading?: boolean;
}

export function EstatisticasGuardaVidas({ ranking, isLoading }: EstatisticasGuardaVidasProps) {
    return (
        <>
            <Card className="w-full">
                <CardContent className={"pt-2.5"}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Pos.</TableHead>
                                <TableHead>Guarda-Vidas</TableHead>
                                <TableHead className="text-right">Dias Trabalhados</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ranking && ranking.length > 0 ? (
                                ranking.map((gv, index) => (
                                    <TableRow key={gv.guardaVidasId}>
                                        <TableCell className="font-medium">{index + 1}º</TableCell>
                                        <TableCell>{gv.nome}</TableCell>
                                        <TableCell className="font-bold flex justify-end">{gv.diasTrabalhados}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                        Nenhum dado de alocação encontrado para gerar estatísticas.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {isLoading && <FullscreenLoader/>}
        </>
    );
}