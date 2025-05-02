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
import {Menu, Bell, User} from "lucide-react"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {BarraLateral} from "./barra-lateral"

export function Cabecalho() {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="lg:hidden">
                    <BarraLateral/>
                </SheetContent>
            </Sheet>
            <div className="flex-1"/>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
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
