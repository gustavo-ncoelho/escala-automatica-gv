"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, Palette, Check, Sun, Moon, Laptop } from "lucide-react"
import {useTheme} from "next-themes";

export default function ConfigPage() {

    const {systemTheme, setTheme} = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<string | undefined>(systemTheme);

    const themes = [
        { name: "Claro", value: "light", icon: Sun },
        { name: "Escuro", value: "dark", icon: Moon },
        { name: "Sistema", value: "system", icon: Laptop },
    ]

    const handleNewCommander = () => {
        console.log("Cadastrar novo comandante clicado")

    }

    const handleThemeSelect = (theme: string) => {
        setTheme(theme)
        setSelectedTheme(theme)
    }

    const currentThemeObject = themes.find((t) => t.value === selectedTheme)
    const CurrentIcon = currentThemeObject?.icon

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Painel de Controle</h1>
                    <p className="text-muted-foreground">Gerencie comandantes e personalize a aparência do sistema</p>
                </div>

                <div className="flex flex-col gap-7 items-start">
                    <Button onClick={handleNewCommander} size="lg" className="flex items-center gap-2 min-w-[200px]">
                        <UserPlus className="h-5 w-5" />
                        Cadastrar novo comandante
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="lg" className="flex items-center gap-2 min-w-[200px]">
                                <Palette className="h-5 w-5" />
                                Selecionar tema
                                <span className="ml-auto text-sm text-muted-foreground">{selectedTheme}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            {themes.map((theme) => {
                                const Icon = theme.icon
                                return (
                                    <DropdownMenuItem
                                        key={theme.name}
                                        onClick={() => handleThemeSelect(theme.value)}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        <span className="flex-1">{theme.name}</span>
                                        {selectedTheme === theme.name && <Check className="h-4 w-4 text-primary" />}
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}