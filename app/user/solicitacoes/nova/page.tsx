"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { outrosGuardaVidas, postos } from "@/utils/dados-simulados"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NovaSolicitacaoPage() {
  const router = useRouter()
  const [tipoSolicitacao, setTipoSolicitacao] = useState<string | null>(null)
  const [postoSelecionado, setPostoSelecionado] = useState<string | null>(null)
  const [dataIndisponivel, setDataIndisponivel] = useState<string>("")
  const [colegaSelecionado, setColegaSelecionado] = useState<string | null>(null)
  const [motivo, setMotivo] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aqui seria implementada a lógica para salvar a nova solicitação
    // Como estamos usando dados simulados, apenas redirecionamos de volta
    router.push("/user/solicitacoes")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/user/solicitacoes">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Nova Solicitação</h1>
          <p className="text-muted-foreground">Crie uma nova solicitação de ajuste.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Solicitação</CardTitle>
            <CardDescription>Selecione o tipo de ajuste que deseja solicitar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={tipoSolicitacao || ""} onValueChange={setTipoSolicitacao}>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="preferencia_posto" id="preferencia_posto" />
                <Label htmlFor="preferencia_posto" className="font-normal cursor-pointer">
                  <div className="font-medium">Mudança de Posto Preferido</div>
                  <div className="text-sm text-muted-foreground">Solicitar alteração em suas preferências de posto</div>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="dia_indisponivel" id="dia_indisponivel" />
                <Label htmlFor="dia_indisponivel" className="font-normal cursor-pointer">
                  <div className="font-medium">Dia Indisponível</div>
                  <div className="text-sm text-muted-foreground">Informar um dia em que não poderá trabalhar</div>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="colega_nao_preferido" id="colega_nao_preferido" />
                <Label htmlFor="colega_nao_preferido" className="font-normal cursor-pointer">
                  <div className="font-medium">Colega Não Preferido</div>
                  <div className="text-sm text-muted-foreground">Informar um colega com quem prefere não trabalhar</div>
                </Label>
              </div>
            </RadioGroup>

            {tipoSolicitacao === "preferencia_posto" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="posto">Selecione o Posto</Label>
                  <Select value={postoSelecionado || ""} onValueChange={setPostoSelecionado}>
                    <SelectTrigger id="posto">
                      <SelectValue placeholder="Selecione um posto" />
                    </SelectTrigger>
                    <SelectContent>
                      {postos.map((posto) => (
                        <SelectItem key={posto.id} value={posto.id.toString()}>
                          {posto.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {tipoSolicitacao === "dia_indisponivel" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data Indisponível</Label>
                  <input
                    type="date"
                    id="data"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={dataIndisponivel}
                    onChange={(e) => setDataIndisponivel(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            )}

            {tipoSolicitacao === "colega_nao_preferido" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="colega">Selecione o Colega</Label>
                  <Select value={colegaSelecionado || ""} onValueChange={setColegaSelecionado}>
                    <SelectTrigger id="colega">
                      <SelectValue placeholder="Selecione um colega" />
                    </SelectTrigger>
                    <SelectContent>
                      {outrosGuardaVidas.map((gv) => (
                        <SelectItem key={gv.id} value={gv.id.toString()}>
                          {gv.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo</Label>
              <Textarea
                id="motivo"
                placeholder="Explique o motivo da sua solicitação..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/user/solicitacoes">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              disabled={
                !tipoSolicitacao ||
                (tipoSolicitacao === "preferencia_posto" && !postoSelecionado) ||
                (tipoSolicitacao === "dia_indisponivel" && !dataIndisponivel) ||
                (tipoSolicitacao === "colega_nao_preferido" && !colegaSelecionado) ||
                !motivo.trim()
              }
            >
              Enviar Solicitação
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
