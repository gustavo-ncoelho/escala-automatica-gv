"use client"

import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {LifeBuoy, Menu, User} from "lucide-react"
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {BarraLateral} from "./barra-lateral"
import {useLogout} from "@/hooks/api/auth/use-logout";
import {useAuthContext} from "@/contexts/auth-context";
import Link from "next/link"

export function Cabecalho() {

    const {mutateAsync} = useLogout();
    const {atualizarSessao} = useAuthContext();

    const handleLogout = async () => {
        try {
            await mutateAsync();
            atualizarSessao();
        } catch (error) {
            console.error("Não foi possível encerrar a sessão.");
        }
    }

    return (
        <header className="sticky w-screen top-0 z-40 bg-background flex h-16 items-center gap-4 border-b shadow-md px-4 lg:h-[64px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="lg:hidden pt-10 pl-0 pr-0 w-64">
                    <SheetTitle/>
                    <BarraLateral/>
                </SheetContent>
            </Sheet>
            <div className="flex min-h-16 items-center px-2">
                <Link href="/admin" className="flex items-center gap-2 font-semibold">
                    <LifeBuoy className="h-6 w-6 text-red-500"/>
                    <span>Escala Automática GV</span>
                </Link>
            </div>
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
                        <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
