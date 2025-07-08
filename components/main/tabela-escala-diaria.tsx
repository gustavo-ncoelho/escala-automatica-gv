"use client";

import React from "react";
import {GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import {cn, getGuardaVidasPorPosto, postoEstaAberto} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import { usePathname } from "next/navigation";

interface TabelaEscalaDiariaProps {
    postos: Posto[];
    guardaVidas: GuardaVidasEscala[];
    alocacoes: AlocacaoDiaria[];
    dataDoDia: Date;
}

export default function TabelaEscalaDiaria ({postos, guardaVidas, dataDoDia, alocacoes}: TabelaEscalaDiariaProps) {
    const pathname = usePathname();
    const isAdminView = pathname.startsWith("/admin");

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0", !isAdminView && "pb-16")}>
            {postos.map((posto) => {
                const estaAberto = postoEstaAberto(posto, dataDoDia);

                const guardaVidasAlocados = estaAberto ? getGuardaVidasPorPosto(posto.id, alocacoes, dataDoDia, guardaVidas) : [];
                const ocupacao = guardaVidasAlocados.length;
                const slotsVazios = posto.alocacaoMaxima - ocupacao;

                return (
                    <Card key={posto.id} className={cn(
                        "border shadow-lg flex flex-col space-y-5 transition-all",
                        !estaAberto && "bg-muted/50 opacity-70 border-dashed"
                    )}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center w-full justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "w-12 h-12 border rounded-lg flex items-center justify-center",
                                            estaAberto ? "bg-black text-white" : "bg-muted-foreground/20 text-muted-foreground"
                                        )}>
                                    <span
                                        className="text-xl font-bold">{posto.nome.includes("Lagoa") ? "L" : posto.numero}</span>
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                        <p className="text-sm text-gray-600">{posto.localizacao}</p>
                                    </div>
                                </div>

                                {estaAberto &&
                                    <Badge
                                        variant={"secondary"}
                                        className={cn("ml-2 text-sm px-2 py-1 rounded-md", ocupacao > posto.alocacaoMaxima && "text-red-300 bg-red-800/40")}
                                    >
                                        {ocupacao}/{posto.alocacaoMaxima}
                                    </Badge>
                                }
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-grow">
                            <div className="border rounded-md overflow-hidden">
                                {estaAberto ? (
                                    <>
                                        {guardaVidasAlocados.map((nome) => (
                                            <div key={`${posto.id}-${nome}`}
                                                 className="border-b last:border-b-0 p-2 min-h-[40px]">
                                                <span className="text-sm text-foreground">{nome}</span>
                                            </div>
                                        ))}
                                        {Array.from({length: slotsVazios > 0 ? slotsVazios : 0}).map((_, i) => (
                                            <div key={`${posto.id}-empty-${i}`}
                                                 className="border-b last:border-b-0 p-2 min-h-[40px]">
                                            <span
                                                className="text-muted-foreground/30 text-sm italic">- - - - - - -</span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center min-h-[80px] p-4">
                                        <p className="text-sm text-muted-foreground italic">Posto fechado neste dia.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}