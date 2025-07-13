"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {BarChart3, CalendarDays, ClipboardList, Settings, TowerControl, Users} from "lucide-react"
import {useAppContext} from "@/contexts/app-context";

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
        titulo: "Postos",
        href: "/admin/postos",
        icone: TowerControl
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
    },
    {
        titulo: "Configurações",
        href: "/admin/config",
        icone: Settings
    }
]

export function BarraLateral() {
    const pathname = usePathname()
    const {isDesktop} = useAppContext();

    return (
        <div className={cn("bg-background z-30 w-60", isDesktop && "border-r w-64")}>
            <div className="flex h-full flex-col gap-2">
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
