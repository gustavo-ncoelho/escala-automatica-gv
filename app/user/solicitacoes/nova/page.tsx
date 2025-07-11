"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import BackButton from "@/components/utils/back-button"
import {useCreateSolicitacao} from "@/hooks/api/solicitacoes/use-create-solicitacao"
import {useAuthContext} from "@/contexts/auth-context"
import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {TipoSolicitacao} from "@prisma/client"
import {useGetGuardaVidasById} from "@/hooks/api/guarda-vidas/use-get-guarda-vidas-by-id";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {StatusSolicitacao} from "@/types/solicitacao";
import FullscreenLoader from "@/components/utils/fullscreen-loader";

const formSchema = z.object({
    tipoSolicitacao: z.enum(["PREFERENCIA_POSTO", "DIA_INDISPONIVEL"], {
        required_error: "Você precisa selecionar um tipo de solicitação.",
    }),
    postoSolicitado: z.string().optional(),
    dataSolicitada: z.string().optional(),
    motivo: z.string().optional()
}).refine((data) => {
    if (data.tipoSolicitacao === "PREFERENCIA_POSTO") {
        return !!data.postoSolicitado;
    }
    return true;
}, {
    message: "Por favor, selecione um posto.",
    path: ["postoSolicitado"],
}).refine((data) => {
    if (data.tipoSolicitacao === "DIA_INDISPONIVEL") {
        return !!data.dataSolicitada;
    }
    return true;
}, {
    message: "Por favor, selecione uma data.",
    path: ["dataSolicitada"],
});

type FormValues = z.infer<typeof formSchema>;

export default function NovaSolicitacaoPage() {
    const router = useRouter();
    const {usuario: usuarioSession} = useAuthContext();
    const {data: usuario, isLoading: isLoadingGuardaVida} = useGetGuardaVidasById(usuarioSession?.id ?? "")
    const {mutate: criarSolicitacao, isPending: isPendingSolicitacao} = useCreateSolicitacao();
    const {data: postos, isLoading: isLoadingPostos} = useGetPostos();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            motivo: "",
        },
    });

    const tipoSolicitacao = form.watch("tipoSolicitacao");

    function onSubmit(data: FormValues) {
        if (!usuario || !usuario.perfilGuardaVidas) {
            toast.error("Usuário não encontrado. Não é possível criar a solicitação.");
            return;
        }

        const payload = {
            guardaVidasId: usuario.perfilGuardaVidas.id,
            tipo: data.tipoSolicitacao as TipoSolicitacao,
            motivo: data.motivo,
            status: "PENDENTE" as StatusSolicitacao,
            dataSolicitada: data.dataSolicitada ? new Date(`${data.dataSolicitada}T12:00:00Z`) : undefined,
            postoSolicitado: data.postoSolicitado,
        };

        criarSolicitacao(payload, {
            onSuccess: () => {
                toast.success("Solicitação enviada com sucesso!");
                router.push("/user/solicitacoes");
            },
            onError: (error) => {
                toast.error(`Falha ao enviar: ${error.message}`);
            }
        });
    }

    return (
        <div className="space-y-6 px-4">
            <div className="flex items-center gap-4">
                <BackButton href="/user/solicitacoes"/>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Nova Solicitação</h1>
                    <p className="text-muted-foreground">Crie uma nova solicitação de ajuste.</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tipo de Solicitação</CardTitle>
                            <CardDescription>Selecione o tipo de ajuste que deseja solicitar</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="tipoSolicitacao"
                                render={({field}) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem
                                                        value="PREFERENCIA_POSTO"/></FormControl>
                                                    <FormLabel className="font-normal">Mudança de Posto
                                                        Preferido</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem
                                                        value="DIA_INDISPONIVEL"/></FormControl>
                                                    <FormLabel className="font-normal">Dia Indisponível</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {tipoSolicitacao === "PREFERENCIA_POSTO" && (
                        <Card>
                            <CardHeader><CardTitle>Detalhes da Preferência</CardTitle></CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="postoSolicitado"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Selecione o Posto</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue
                                                    placeholder="Selecione um posto"/></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {postos?.map((posto) => (
                                                        <SelectItem key={posto.id}
                                                                    value={posto.id.toString()}>{posto.nome}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {tipoSolicitacao === "DIA_INDISPONIVEL" && (
                        <Card>
                            <CardHeader><CardTitle>Detalhes da Indisponibilidade</CardTitle></CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="dataSolicitada"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Data Indisponível</FormLabel>
                                            <FormControl><Input type="date" {...field} /></FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader><CardTitle>Motivo</CardTitle></CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="motivo"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Descreva o motivo da sua solicitação</FormLabel>
                                        <FormControl><Textarea
                                            placeholder="Explique por que você está solicitando este ajuste..." {...field} /></FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.push("/user/solicitacoes")}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPendingSolicitacao}>
                            Enviar Solicitação
                        </Button>
                    </div>
                </form>
            </Form>

            {(isLoadingPostos || isLoadingGuardaVida || isPendingSolicitacao) && <FullscreenLoader/>}
        </div>
    )
}
