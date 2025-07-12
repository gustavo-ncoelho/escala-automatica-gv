"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {useLogin} from "@/hooks/api/auth/use-login";
import {useAuthContext} from "@/contexts/auth-context";
import {cn} from "@/lib/utils";
import {Loader2} from "lucide-react"

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email é obrigatório" }).email({ message: "Email inválido" }),
    senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
})

export default function LoginForm() {

    const { mutate, isPending, error } = useLogin();
    const {atualizarSessao} = useAuthContext();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        const loginPayload = {
            email: data.email,
            senha: data.senha
        }
        mutate(loginPayload,{
            onSuccess: () => {
                atualizarSessao();
            }
        });
    }

    return (
        <div>
            <Card className="w-full">
                <CardHeader className="space-y-1 max-md:p-4">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">Entre com suas credenciais para acessar sua conta</CardDescription>
                </CardHeader>
                <CardContent className={"max-md:p-4"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit,
                            (errors) => {
                                console.error("Erros de Validação do Zod:", errors);
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

                            <button type="submit" className="w-full flex items-center justify-center h-11 mt-3 bg-black text-white rounded-md xl:hover:bg-gray-800">
                                {!isPending && <p>Entrar</p>}
                                {isPending && <Loader2 className={cn("animate-spin size-10 stroke-1 text-red-500")}/>}
                            </button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    )
}
