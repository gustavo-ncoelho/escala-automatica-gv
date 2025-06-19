"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {useLogin} from "@/hooks/api/auth/login";

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email é obrigatório" }).email({ message: "Email inválido" }),
    senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
})

export default function LoginForm() {

    const { mutate, isPending, error } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log("CADHSIAGFIYSDGFLKASDHGFLA")
        const loginPayload = {
            email: data.email,
            senha: data.senha
        }
        mutate(loginPayload)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">Entre com suas credenciais para acessar sua conta</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit,
                            (errors) => {
                                console.log("Erros de Validação do Zod:", errors);
                            })} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="seu@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*<Button type="submit" className="w-full">
                                Entrar
                            </Button>*/}
                            <button type="submit" className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-800">
                                Entrar (Botão de Teste)
                            </button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
