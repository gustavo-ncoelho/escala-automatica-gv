"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent} from "@/components/ui/card";
import BackButton from "@/components/utils/back-button";
import {PhoneInput} from "@/components/ui/phone-input";
import {useCadastrarUsuario} from "@/hooks/api/auth/use-cadastrar-usuario";
import FullscreenLoader from "@/components/utils/fullscreen-loader";
import { useRouter } from "next/navigation"

const formSchema = z.object({
    nome: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um email válido.",
    }),
    telefone: z.string().min(11, {
        message: "Telefone deve ter pelo menos 10 dígitos.",
    }),
    senha: z.string().min(6, {
        message: "Senha deve ter pelo menos 6 caracteres.",
    }),
})

export default function CadastrarComandantePage() {

    const {mutateAsync: cadastrarComandante, isPending: isPendingCadastro} = useCadastrarUsuario();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            senha: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await cadastrarComandante({
            ...data,
            cargo: "COMANDANTE"
        }, {
            onSuccess: () => {
                toast.success("Comandante cadastrado com sucesso!");
                router.push("/admin")
            },
            onError: () => toast.error("Houve um erro ao cadastrar, tente novamente em breve"),
        })
    }

    return (
        <div className={"space-y-4"}>
            <div className="flex items-center gap-5">
                <BackButton href={"/admin/config"}/>
                <h1 className="text-3xl font-bold">Cadastrar Comandante</h1>
            </div>
            <Card>
                <CardContent className={"pt-4"}>
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
                                        <FormDescription>Usaremos este email para entrar em contato com
                                            você.</FormDescription>
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
                                            <PhoneInput field={field}/>
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

                            <Button type="submit">
                                Cadastrar Comandante
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {isPendingCadastro && <FullscreenLoader/>}
        </div>
    )
}
