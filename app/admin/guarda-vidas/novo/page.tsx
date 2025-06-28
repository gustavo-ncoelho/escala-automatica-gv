"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
import {z} from "zod"
import {CalendarIcon, Plus, Trash2} from "lucide-react"
import {format, parse} from "date-fns"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"
import BackButton from "@/components/utils/back-button";
import {useCadastrarUsuario} from "@/hooks/api/auth/use-cadastrar-usuario";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/utils/use-toast";
import {Checkbox} from "@/components/ui/checkbox"

export default function LifeguardForm() {

    const {mutateAsync} = useCadastrarUsuario();
    const {toast} = useToast();
    const router = useRouter();

    const diasDaSemanaOpcoes = [
        {id: "segunda", label: "Segunda-feira"},
        {id: "terca_feira", label: "Terça-feira"},
        {id: "quarta_feira", label: "Quarta-feira"},
        {id: "quinta_feira", label: "Quinta-feira"},
        {id: "sexta_feira", label: "Sexta-feira"},
        {id: "sabado", label: "Sábado"},
        {id: "domingo", label: "Domingo"},
    ] as const;

    const postos = [
        {id: "1", nome: "Posto 1 - Praia Central"},
        {id: "2", nome: "Posto 2 - Praia Norte"},
        {id: "3", nome: "Posto 3 - Praia Sul"},
        {id: "4", nome: "Posto 4 - Lagoa"},
        {id: "5", nome: "Posto 5 - Pier"},
    ]

    const preferenciaPostoSchema = z.object({
        postoId: z.string(),
        justificativa: z.string().optional(),
        prioridade: z.number().min(1).max(10, "Prioridade deve ser entre 1 e 10")
    });

    const diaIndisponivelSchema = z.object({
        data: z.date({
            required_error: "Data é obrigatória",
        }),
        motivo: z.string().optional(),
    });

    const diaDaSemanaEnum = z.enum([
        "segunda",
        "terca_feira",
        "quarta_feira",
        "quinta_feira",
        "sexta_feira",
        "sabado",
        "domingo"
    ]);

    const guardaVidasSchema = z.object({
        nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().email("Email inválido"),
        telefone: z.string().optional(),
        senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        dataAdmissao: z.string({required_error: "Data de admissão é obrigatória"}).regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato inválido (DD/MM/AAAA)"),
        diasDeFolga: z.array(diaDaSemanaEnum).optional(),
        preferenciasPostos: z.array(preferenciaPostoSchema).optional(),
        diasIndisponiveis: z.array(diaIndisponivelSchema).optional()
    })

    type GuardaVidasFormValues = z.infer<typeof guardaVidasSchema>

    const form = useForm<GuardaVidasFormValues>({
        resolver: zodResolver(guardaVidasSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            dataAdmissao: "",
            preferenciasPostos: [],
            diasIndisponiveis: [],
            diasDeFolga: []
        },
    })

    const {fields: preferenciaFields, append: appendPreferencia, remove: removePreferencia} = useFieldArray({
        control: form.control,
        name: "preferenciasPostos",
    })

    const {fields: indisponivelFields, append: appendIndisponivel, remove: removeIndisponivel,} = useFieldArray({
        control: form.control,
        name: "diasIndisponiveis",
    })

    async function onSubmit(data: GuardaVidasFormValues) {
        try {
            await mutateAsync({
                ...data,
                data_admissao: parse(data.dataAdmissao, "dd/MM/yyyy", new Date()),
                cargo: "GUARDA_VIDAS"
            });
            console.log(data.dataAdmissao)
            toast.success("Guarda Vidas cadastrado com sucesso");
            router.push("/admin/guarda-vidas")
        } catch (error) {
            return toast.error(`Erro ao cadastrar guarda vidas ${error}`)
        }
    }

    return (
        <div className="container w-full py-8">
            <div className={"flex items-center gap-4 mb-8"}>
                <BackButton href={"/admin/guarda-vidas"}/>

                <div>
                    <h1 className="text-3xl font-bold">Cadastro de Guarda-Vidas</h1>
                    <p className="text-muted-foreground">
                        Preencha as informações do guarda-vidas, suas preferências de postos e dias indisponíveis.
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Básicas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <FormField
                                    control={form.control}
                                    name="nome"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="João Silva" {...field} />
                                            </FormControl>
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
                                                <Input type="email" placeholder="joao@exemplo.com" {...field} />
                                            </FormControl>
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
                                                <Input placeholder="(00) 00000-0000" {...field} maxLength={11}/>
                                            </FormControl>
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
                                                <Input placeholder="*********" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dataAdmissao"
                                    render={({field}) => {
                                        const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            if (value.length > 2) {
                                                value = `${value.slice(0, 2)}/${value.slice(2)}`;
                                            }
                                            if (value.length > 5) {
                                                value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
                                            }
                                            field.onChange(value);
                                        };

                                        return (
                                            <FormItem>
                                                <FormLabel>Data de Admissão</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="DD/MM/AAAA"
                                                        value={field.value}
                                                        onChange={handleDateChange}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Dias de Folga Fixos</CardTitle>
                            <FormDescription>
                                Selecione os dias da semana em que este guarda-vidas terá folga recorrente.
                            </FormDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="diasDeFolga"
                                render={() => (
                                    <FormItem className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {diasDaSemanaOpcoes.map((dia) => (
                                            <FormField
                                                key={dia.id}
                                                control={form.control}
                                                name="diasDeFolga"
                                                render={({field}) => {
                                                    return (
                                                        <FormItem
                                                            className="flex flex-row items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(dia.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...(field.value || []), dia.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== dia.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {dia.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências de Postos</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Adicione as preferências de postos em ordem de prioridade (1 = maior prioridade).
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {preferenciaFields.map((field, index) => (
                                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">Preferência {index + 1}</h4>
                                        {preferenciaFields.length > 1 && (
                                            <Button type="button" variant="outline" size="sm"
                                                    onClick={() => removePreferencia(index)}>
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`preferenciasPostos.${index}.postoId`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Posto</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione um posto"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {postos.map((posto) => (
                                                                <SelectItem key={posto.id} value={posto.id.toString()}>
                                                                    {posto.nome}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`preferenciasPostos.${index}.prioridade`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Prioridade (1-10)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`preferenciasPostos.${index}.justificativa`}
                                            render={({field}) => (
                                                <FormItem className="md:col-span-1">
                                                    <FormLabel>Justificativa</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Explique o motivo da preferência..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() =>
                                    appendPreferencia({
                                        postoId: "",
                                        justificativa: "",
                                        prioridade: 0,
                                    })
                                }
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Adicionar Preferência
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Dias Indisponíveis</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Adicione os dias em que o guarda-vidas não estará disponível.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {indisponivelFields.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">Nenhum dia indisponível
                                    adicionado.</p>
                            )}

                            {indisponivelFields.map((field, index) => (
                                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium">Dia Indisponível {index + 1}</h4>
                                        <Button type="button" variant="outline" size="sm"
                                                onClick={() => removeIndisponivel(index)}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`diasIndisponiveis.${index}.data`}
                                            render={({field}) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Data</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground",
                                                                    )}
                                                                >
                                                                    {field.value ? format(field.value, "dd/MM/yyyy") :
                                                                        <span>Selecione uma data</span>}
                                                                    <CalendarIcon
                                                                        className="ml-auto h-4 w-4 opacity-50"/>
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date()}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`diasIndisponiveis.${index}.motivo`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Motivo (Opcional)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Descreva o motivo da indisponibilidade..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() =>
                                    appendIndisponivel({
                                        data: new Date(),
                                        motivo: "",
                                    })
                                }
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Adicionar Dia Indisponível
                            </Button>
                        </CardContent>
                    </Card>

                    <Separator/>

                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit">Salvar Guarda-Vidas</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
