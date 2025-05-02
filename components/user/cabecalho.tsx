"use client"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Bell, User, LifeBuoy} from "lucide-react"
import Link from "next/link"

export function Cabecalho() {
    return (
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16">
            <Link href="/user" className="flex items-center gap-2 font-semibold">
                <LifeBuoy className="h-5 w-5 text-red-500"/>
                <span>Escala GV</span>
            </Link>
            <div className="flex-1"/>
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5"/>
                            <span className="sr-only">Perfil</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
