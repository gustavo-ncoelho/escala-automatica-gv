import type React from "react"
import {BarraLateral} from "@/components/admin/barra-lateral"
import {Cabecalho} from "@/components/admin/cabecalho"
import {getUser} from "@/lib/session/session";
import {redirect} from "next/navigation";
import {AdminProvider} from "@/contexts/admin-context";

export default async function AdminLayout({children,}: Readonly<{ children: React.ReactNode }>) {

    const user = await getUser();

    if (!user || user.cargo !== 'COMANDANTE') {
        redirect('/');
    }

    return (
        <div className="flex h-screen">
            <BarraLateral/>
            <div className="flex flex-col flex-1 overflow-hidden">
                <Cabecalho/>
                <main className="flex-1 overflow-auto p-6 bg-muted/30">
                    <AdminProvider>
                        {children}
                    </AdminProvider>
                </main>
            </div>
        </div>
    )
}
