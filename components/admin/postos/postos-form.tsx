"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Posto} from "@/types/guarda-vidas"
import BackButton from "@/components/utils/back-button"
import {Separator} from "@/components/ui/separator"
import {Checkbox} from "@/components/ui/checkbox"
import {diasDaSemanaOpcoes} from "@/lib/utils"
import {Slider} from "@/components/ui/slider"
import {Calendar, Plus, Trash2} from "lucide-react"
import {format} from "date-fns"
import {DiaDaSemana} from "@prisma/client"
import {useCreatePosto} from "@/hooks/api/postos/use-create-posto";
import {useUpdatePosto} from "@/hooks/api/postos/use-update-posto";
import {toast} from "sonner"
import {useRouter} from "next/navigation"
import FullscreenLoader from "@/components/utils/fullscreen-loader";

const diaDaSemanaEnum = z.enum(["segunda", "terca_feira", "quarta_feira", "quinta_feira", "sexta_feira", "sabado", "domingo"]);

const dataFechadaSchema = z.object({
    data: z.string({required_error: "A data é obrigatória."})
        .min(1, "A data é obrigatória."),
    motivo: z.string().optional()
});

const postoSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(2, {message: "Nome deve ter pelo menos 2 caracteres."}),
    numero: z.coerce.number().min(1, {message: "Número deve ser maior que zero."}),
    alocacaoMaxima: z.coerce.number().min(1, {message: "Alocação máxima deve ser maior que zero."}),
    localizacao: z.string().optional(),
    movimento: z.number().min(1).max(10),
    diasFechados: z.array(diaDaSemanaEnum).default([]),
    datasFechadas: z.array(dataFechadaSchema).default([]),
})

interface PostoFormProps {
    posto?: Posto
    isEditing?: boolean
    isLoadingPosto?: boolean;
}

export default function PostosForm({posto, isEditing = false, isLoadingPosto}: PostoFormProps) {

    const router = useRouter();
    const {mutateAsync: criarPosto, isPending: isPendingCreate} = useCreatePosto();
    const {mutateAsync: atualizarPosto, isPending: isPendingUpdate} = useUpdatePosto();

    const form = useForm<z.infer<typeof postoSchema>>({
        resolver: zodResolver(postoSchema),
        defaultValues: {
            id: posto?.id,
            nome: posto?.nome || "",
            numero: posto?.numero || 0,
            alocacaoMaxima: posto?.alocacaoMaxima || 1,
            localizacao: posto?.localizacao || "",
            movimento: posto?.movimento || 5,
            diasFechados: (posto?.diasFechados) || [],
            datasFechadas: posto?.datasFechadas?.map(d => ({
                ...d,
                data: format(new Date(d.data), 'yyyy-MM-dd')
            })) || [],
        },
    })

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "datasFechadas",
    });

    async function handleFormSubmit(data: z.infer<typeof postoSchema>) {
        const dataParaApi = {
            nome: data.nome,
            numero: data.numero,
            alocacaoMaxima: data.alocacaoMaxima,
            localizacao: data.localizacao,
            movimento: data.movimento,
            diasFechados: data.diasFechados,
            datasFechadas: data.datasFechadas
                ?.filter(dia => dia.data)
                .map(dia => ({
                    ...dia,
                    data: new Date(`${dia.data}T12:00:00Z`)
                }))
        };

        if (isEditing && posto) {
            try {
                await atualizarPosto({id: posto.id, data: dataParaApi});
                toast.success("Posto alterado com sucesso!");
                router.push("/admin/postos");
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
                toast.error(`Erro ao alterar posto: ${errorMessage}`);
            }
        } else {
            try {
                await criarPosto(dataParaApi as any);
                toast.success("Posto criado com sucesso!");
                router.push("/admin/postos");
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
                toast.error(`Ocorreu um erro ao criar um posto: ${errorMessage}`);
            }
        }
    }

    return (
        <div className={"space-y-6"}>
            <div className="flex gap-5 items-center">
                <BackButton href="/admin/postos"/>
                <div>
                    <div className={"text-3xl font-semibold"}>{isEditing ? "Editar Posto" : "Cadastrar Novo Posto"}</div>
                    <div className={"text-muted-foreground"}>
                        {isEditing ? "Atualize as informações do posto" : "Preencha os dados para um novo posto"}
                    </div>
                </div>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Informações Gerais</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nome do Posto</FormLabel>
                                        <FormControl><Input
                                            placeholder="Ex: Posto Central" {...field} /></FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numero"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Número</FormLabel>
                                        <FormControl><Input type="number"
                                                            placeholder="1" {...field} /></FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="alocacaoMaxima"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Alocação Máxima</FormLabel>
                                        <FormControl><Input type="number"
                                                            placeholder="4" {...field} /></FormControl>
                                        <p className="text-sm text-muted-foreground">Máximo de guarda-vidas
                                            alocados.</p>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="localizacao"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Localização (Opcional)</FormLabel>
                                        <FormControl><Textarea
                                            placeholder="Ex: Praia de Copacabana - Setor A" {...field} /></FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="movimento"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Nível de Movimento</FormLabel>
                                            <span className="text-sm font-medium">{field.value}/10</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                min={1} max={10} step={1}
                                                defaultValue={[field.value]}
                                                onValueChange={(value) => field.onChange(value[0])}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Fechamentos Programados</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="diasFechados"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Dias da Semana (Folgas Fixas)</FormLabel>
                                        <FormDescription>Marque os dias em que o posto não abre.</FormDescription>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                            {diasDaSemanaOpcoes.map((dia) => (
                                                <FormField
                                                    key={dia.id}
                                                    control={form.control}
                                                    name="diasFechados"
                                                    render={({field}) => (
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(dia.id as DiaDaSemana)}
                                                                    onCheckedChange={(checked) => {
                                                                        const diaId = dia.id as DiaDaSemana;
                                                                        return checked
                                                                            ? field.onChange([...(field.value || []), diaId])
                                                                            : field.onChange(field.value?.filter(value => value !== diaId))
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel
                                                                className="font-normal">{dia.label}</FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Separator/>

                            <div className="space-y-4">
                                <FormLabel>Datas Específicas</FormLabel>
                                <FormDescription>
                                    Adicione datas em que o posto estará fechado (ex: feriados, eventos).
                                </FormDescription>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-start gap-4 pt-4 border-t">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mt-7">
                                            <Calendar className="h-5 w-5"/>
                                        </div>
                                        <div className="flex-1 grid gap-2">
                                            <FormField
                                                control={form.control}
                                                name={`datasFechadas.${index}.data`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Data</FormLabel>
                                                        <FormControl>
                                                            <Input type="date" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`datasFechadas.${index}.motivo`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Motivo (Opcional)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Descreva o motivo..." {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Button type="button" variant="trash" size="icon" className="mt-7"
                                                onClick={() => remove(index)}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => append({data: "", motivo: ""})}
                                >
                                    <Plus className="h-4 w-4 mr-2"/> Adicionar Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">
                            {isEditing ? "Atualizar Posto" : "Cadastrar Posto"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.push("/admin/postos")}
                                className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Form>

            {(isLoadingPosto || isPendingCreate || isPendingUpdate) && <FullscreenLoader/>}
        </div>
    )
}