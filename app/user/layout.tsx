import type React from "react"
import {BarraNavegacao} from "@/components/user/barra-navegacao"
import {Cabecalho} from "@/components/user/cabecalho"

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Cabecalho/>
            <main className="flex-1 p-4 pb-16 md:p-6">{children}</main>
            <BarraNavegacao/>
        </div>
    )
}
