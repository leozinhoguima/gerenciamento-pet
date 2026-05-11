"use client"

import React, { useState } from "react"

type ItemRelatorio = {
  label: string
  valor: number | string
}

type Relatorio = {
  id: string
  titulo: string
  descricao: string
  icon: string
  cor: string
  dados: ItemRelatorio[]
}

export default function RelatoriosPage() {
  const [relatorioAtivo, setRelatorioAtivo] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState("mes")

  const relatorios: Relatorio[] = [
    {
      id: "clientes",
      titulo: "Relatório de Clientes",
      descricao: "Total de clientes cadastrados e novos no período",
      icon: "👤",
      cor: "bg-teal-500",
      dados: [
        { label: "Total de Clientes", valor: 0 },
        { label: "Novos no Período", valor: 0 },
        { label: "Clientes Ativos", valor: 0 },
        { label: "Clientes Inativos", valor: 0 },
      ],
    },
    {
      id: "pets",
      titulo: "Relatório de Pets",
      descricao: "Quantidade de pets por espécie e cadastros",
      icon: "🐾",
      cor: "bg-orange-400",
      dados: [
        { label: "Total de Pets", valor: 0 },
        { label: "Cães", valor: 0 },
        { label: "Gatos", valor: 0 },
        { label: "Outros", valor: 0 },
      ],
    },
    {
      id: "consultas",
      titulo: "Relatório de Consultas",
      descricao: "Consultas realizadas, agendadas e canceladas",
      icon: "🩺",
      cor: "bg-blue-400",
      dados: [
        { label: "Total de Consultas", valor: 0 },
        { label: "Concluídas", valor: 0 },
        { label: "Agendadas", valor: 0 },
        { label: "Canceladas", valor: 0 },
      ],
    },
    {
      id: "cobrancas",
      titulo: "Relatório de Cobranças",
      descricao: "Receitas, pendências e cancelamentos",
      icon: "💰",
      cor: "bg-green-400",
      dados: [
        { label: "Total Faturado", valor: "R$ 0,00" },
        { label: "Total Recebido", valor: "R$ 0,00" },
        { label: "Total Pendente", valor: "R$ 0,00" },
        { label: "Total Cancelado", valor: "R$ 0,00" },
      ],
    },
    {
      id: "produtos",
      titulo: "Relatório de Produtos",
      descricao: "Estoque, produtos com baixo nível e categorias",
      icon: "📦",
      cor: "bg-purple-400",
      dados: [
        { label: "Total de Produtos", valor: 0 },
        { label: "Itens em Estoque", valor: 0 },
        { label: "Estoque Baixo (≤5)", valor: 0 },
        { label: "Categorias", valor: 0 },
      ],
    },
    {
      id: "prescricoes",
      titulo: "Relatório de Prescrições",
      descricao: "Prescrições emitidas e medicamentos mais usados",
      icon: "💊",
      cor: "bg-red-400",
      dados: [
        { label: "Total de Prescrições", valor: 0 },
        { label: "Medicamentos Prescritos", valor: 0 },
        { label: "Veterinários Ativos", valor: 0 },
        { label: "Média por Consulta", valor: 0 },
      ],
    },
  ]

  const relatorioSelecionado = relatorios.find((r) => r.id === relatorioAtivo)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">📊 Relatórios</h2>
        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-gray-600 text-sm"
        >
          <option value="hoje">Hoje</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mês</option>
          <option value="trimestre">Este trimestre</option>
          <option value="ano">Este ano</option>
        </select>
      </div>

      <div className="flex gap-4">
        {/* Cards de relatórios */}
        <div className={relatorioAtivo ? "w-1/2" : "w-full"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatorios.map((r) => (
              <div
                key={r.id}
                onClick={() => setRelatorioAtivo(relatorioAtivo === r.id ? null : r.id)}
                className={`bg-white rounded-2xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-200 ${
                  relatorioAtivo === r.id ? "ring-2 ring-teal-400" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${r.cor} rounded-xl p-2.5`}>
                    <span className="text-xl">{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 text-sm">{r.titulo}</h3>
                    <p className="text-xs text-gray-400">{r.descricao}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {r.dados.slice(0, 2).map((d) => (
                    <div key={d.label} className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-gray-400">{d.label}</p>
                      <p className="font-bold text-gray-700 text-sm">{d.valor}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-teal-500 font-medium">
                  {relatorioAtivo === r.id ? "▲ Fechar detalhes" : "▼ Ver detalhes"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhe do relatório */}
        {relatorioSelecionado && (
          <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`${relatorioSelecionado.cor} rounded-xl p-2.5`}>
                  <span className="text-2xl">{relatorioSelecionado.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{relatorioSelecionado.titulo}</h3>
                  <p className="text-xs text-gray-400">{relatorioSelecionado.descricao}</p>
                </div>
              </div>
              <button onClick={() => setRelatorioAtivo(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Período */}
            <div className="bg-teal-50 rounded-xl px-4 py-2 mb-5 text-sm text-teal-700 font-medium">
              📅 Período: {
                periodo === "hoje" ? "Hoje" :
                periodo === "semana" ? "Esta semana" :
                periodo === "mes" ? "Este mês" :
                periodo === "trimestre" ? "Este trimestre" : "Este ano"
              }
            </div>

            {/* Dados */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {relatorioSelecionado.dados.map((d) => (
                <div key={d.label} className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">{d.label}</p>
                  <p className="text-2xl font-bold text-gray-700">{d.valor}</p>
                </div>
              ))}
            </div>

            {/* Aviso dados reais */}
            <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-700">
              <p className="font-medium mb-1">⚠️ Dados em tempo real</p>
              <p className="text-xs text-yellow-600">
                Os dados serão populados automaticamente quando o banco de dados estiver conectado.
              </p>
            </div>

            {/* Botão exportar */}
            <button className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-teal-300 text-teal-500 hover:bg-teal-50 transition-colors text-sm font-medium">
              📥 Exportar Relatório (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}