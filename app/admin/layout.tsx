import type React from "react"
import {BarraLateral} from "@/components/admin/barra-lateral"
import {Cabecalho} from "@/components/admin/cabecalho"

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex h-screen">
            <BarraLateral/>
            <div className="flex flex-col flex-1 overflow-hidden">
                <Cabecalho/>
                <main className="flex-1 overflow-auto p-6 bg-muted/30">{children}</main>
            </div>
        </div>
    )
}
