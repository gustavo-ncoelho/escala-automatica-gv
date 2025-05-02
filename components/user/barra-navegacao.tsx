"use client"

import {CalendarDays, ClipboardList, Home, MapPin} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"

const itensMenu = [
    {
        titulo: "Início",
        href: "/user",
        icone: Home,
    },
    {
        titulo: "Solicitações",
        href: "/user/solicitacoes",
        icone: ClipboardList,
    },
]

export function BarraNavegacao() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 z-10 w-full border-t bg-background">
            <nav className="h-16 flex justify-evenly items-center">
                {itensMenu.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs font-medium",
                                isActive ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            <item.icone className={cn("h-5 w-5", isActive && "text-primary")}/>
                            <span>{item.titulo}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
