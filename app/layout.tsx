import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import QueryProvider from "@/components/providers/query-provider";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Sistema de Escala Automática - Guarda-Vidas",
    description: "Sistema de gerenciamento de escala para guarda-vidas"
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className={inter.className}>
        <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                {children}
                <Toaster/>
            </ThemeProvider>
        </QueryProvider>
        </body>
        </html>
    )
}
