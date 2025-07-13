import type React from "react"
import {BarraNavegacao} from "@/components/user/barra-navegacao"
import {Cabecalho} from "@/components/user/cabecalho"
import {UserProvider} from "@/contexts/user-context";

export default async function UserLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <Cabecalho/>
            <main className="flex-1 flex flex-col py-4 pb-14">
                <UserProvider>
                    {children}
                </UserProvider>
            </main>
            <BarraNavegacao/>
        </div>
    )
}
