"use client";

import type React from "react"
import {BarraLateral} from "@/components/admin/barra-lateral"
import {Cabecalho} from "@/components/admin/cabecalho"
import {AdminProvider} from "@/contexts/admin-context";
import {useAppContext} from "@/contexts/app-context";

export default function AdminLayout({children,}: Readonly<{ children: React.ReactNode }>) {

    const {isDesktop} = useAppContext();

    return (
        <div className="flex flex-col flex-1 h-screen">
            <Cabecalho/>
            <div className="flex flex-1 overflow-hidden">
                {isDesktop && <BarraLateral/>}
                <main className="flex-1 overflow-auto p-6 bg-muted/30">
                    <AdminProvider>
                        {children}
                    </AdminProvider>
                </main>
            </div>
        </div>
    )
}
