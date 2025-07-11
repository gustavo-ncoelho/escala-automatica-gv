"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { User, LifeBuoy, Sun, Moon, SunMoon } from "lucide-react"
import Link from "next/link"
import { useLogout } from "@/hooks/api/auth/use-logout";
import { useAuthContext } from "@/contexts/auth-context";
import { useTheme } from "next-themes";
import {cn} from "@/lib/utils";
import {useEffect, useState } from "react"

export function Cabecalho() {
    const { mutate: handleLogout } = useLogout();
    const { usuario } = useAuthContext();
    const { setTheme, theme } = useTheme();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const renderThemeSwitcher = () => {
        if (!isMounted) {
            return <div className="w-9 h-9" />;
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {theme === "dark" && <Sun className="h-[1.2rem] w-[1.2rem]"/>}
                        {theme === "light" && <Moon className="h-[1.2rem] w-[1.2rem]"/>}
                        <span className="sr-only">Alterar tema</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className={cn(theme === "light" && "bg-primary/15")} onClick={() => setTheme("light")}>
                        Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem className={cn(theme === "dark" && "bg-primary/15")} onClick={() => setTheme("dark")}>
                        Escuro
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b shadow-md bg-background px-4 sm:h-16">
            <Link href={usuario?.cargo === 'COMANDANTE' ? '/admin' : '/user'} className="flex items-center gap-2 font-semibold">
                <LifeBuoy className="h-5 w-5 text-red-500"/>
                <span>Escala GV</span>
            </Link>
            <div className="flex-1"/>
            <div className="flex items-center gap-2">

                {renderThemeSwitcher()}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <User className="h-5 w-5"/>
                            <span className="sr-only">Perfil</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleLogout()}>Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}