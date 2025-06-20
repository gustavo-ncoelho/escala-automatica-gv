"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um email válido.",
    }),
    telefone: z
        .string()
        .min(10, {
            message: "Telefone deve ter pelo menos 10 dígitos.",
        })
        .regex(/^[\d\s\-$$$$+]+$/, {
            message: "Formato de telefone inválido.",
        }).optional(),
    senha: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
    }),
})

export default function CadastrarComandantePage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast("Formulário enviado com sucesso!", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Cadastrar Comandante</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nome completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu nome completo" {...field} />
                                </FormControl>
                                <FormDescription>Este será seu nome de exibição público.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="exemplo@email.com" {...field} />
                                </FormControl>
                                <FormDescription>Usaremos este email para entrar em contato com você.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="(11) 99999-9999" {...field} />
                                </FormControl>
                                <FormDescription>Inclua o DDD do seu telefone.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="senha"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Digite uma senha segura" {...field} />
                                </FormControl>
                                <FormDescription>A senha deve ter pelo menos 8 caracteres.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Criar Conta
                    </Button>
                </form>
            </Form>
        </div>
    )
}
