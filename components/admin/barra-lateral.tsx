"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {CalendarDays, BarChart3, Users, ClipboardList, Settings, LifeBuoy} from "lucide-react"

const itensMenu = [
    {
        titulo: "Escala",
        href: "/admin",
        icone: CalendarDays,
    },
    {
        titulo: "Guarda-Vidas",
        href: "/admin/guarda-vidas",
        icone: Users,
    },
    {
        titulo: "Painel",
        href: "/admin/painel",
        icone: BarChart3,
    },
    {
        titulo: "Solicitações",
        href: "/admin/solicitacoes",
        icone: ClipboardList,
    }
]

export function BarraLateral() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r bg-background lg:block lg:w-64">
            <div className="flex h-full flex-col gap-2">
                <div className="flex min-h-16 items-center border-b px-4">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <LifeBuoy className="h-6 w-6 text-red-500"/>
                        <span>Escala GV</span>
                    </Link>
                </div>
                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-1 py-2">
                        {itensMenu.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icone className="mr-2 h-4 w-4"/>
                                    {item.titulo}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
