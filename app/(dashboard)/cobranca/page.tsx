"use client"

import React, { useState } from "react"

type Cobranca = {
  id: number
  pet: string
  tutor: string
  servico: string
  valor: number
  desconto: number
  status: "Pendente" | "Pago" | "Cancelado"
  data: string
  vencimento: string
  formaPagamento: string
}

const statusColors: Record<string, string> = {
  Pendente: "bg-yellow-100 text-yellow-700",
  Pago: "bg-green-100 text-green-700",
  Cancelado: "bg-red-100 text-red-600",
}

export default function CobrancaPage() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selecionada, setSelecionada] = useState<Cobranca | null>(null)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [form, setForm] = useState({
    pet: "",
    tutor: "",
    servico: "",
    valor: "",
    desconto: "",
    status: "Pendente" as Cobranca["status"],
    data: "",
    vencimento: "",
    formaPagamento: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.pet || !form.tutor || !form.valor || !form.data) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const nova: Cobranca = {
      id: Date.now(),
      pet: form.pet,
      tutor: form.tutor,
      servico: form.servico,
      valor: Number(form.valor),
      desconto: Number(form.desconto) || 0,
      status: form.status,
      data: form.data,
      vencimento: form.vencimento,
      formaPagamento: form.formaPagamento,
    }
    setCobrancas([...cobrancas, nova])
    setForm({
      pet: "", tutor: "", servico: "", valor: "", desconto: "",
      status: "Pendente", data: "", vencimento: "", formaPagamento: "",
    })
    setShowForm(false)
  }

  function handleAlterarStatus(id: number, status: Cobranca["status"]) {
    setCobrancas(cobrancas.map((c) => c.id === id ? { ...c, status } : c))
    if (selecionada?.id === id) setSelecionada({ ...selecionada, status })
  }

  function handleDeletar(id: number) {
    if (confirm("Deseja remover esta cobrança?")) {
      setCobrancas(cobrancas.filter((c) => c.id !== id))
      if (selecionada?.id === id) setSelecionada(null)
    }
  }

  const filtradas = cobrancas.filter((c) => {
    const matchBusca =
      c.pet.toLowerCase().includes(busca.toLowerCase()) ||
      c.tutor.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus ? c.status === filtroStatus : true
    return matchBusca && matchStatus
  })

  const totalPendente = cobrancas
    .filter((c) => c.status === "Pendente")
    .reduce((acc, c) => acc + (c.valor - c.desconto), 0)

  const totalRecebido = cobrancas
    .filter((c) => c.status === "Pago")
    .reduce((acc, c) => acc + (c.valor - c.desconto), 0)

  const totalCancelado = cobrancas
    .filter((c) => c.status === "Cancelado")
    .reduce((acc, c) => acc + (c.valor - c.desconto), 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">💰 Cobranças</h2>
        <button
          onClick={() => { setShowForm(!showForm); setSelecionada(null) }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          {showForm ? "✕ Cancelar" : "+ Nova Cobrança"}
        </button>
      </div>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-yellow-400 rounded-xl p-3"><span className="text-2xl">⏳</span></div>
          <div>
            <p className="text-sm text-gray-400">Pendente</p>
            <p className="text-2xl font-bold text-gray-700">R$ {totalPendente.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-green-400 rounded-xl p-3"><span className="text-2xl">✅</span></div>
          <div>
            <p className="text-sm text-gray-400">Recebido</p>
            <p className="text-2xl font-bold text-gray-700">R$ {totalRecebido.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-red-400 rounded-xl p-3"><span className="text-2xl">❌</span></div>
          <div>
            <p className="text-sm text-gray-400">Cancelado</p>
            <p className="text-2xl font-bold text-gray-700">R$ {totalCancelado.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Nova Cobrança</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nome do Pet *</label>
              <input name="pet" value={form.pet} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Tutor *</label>
              <input name="tutor" value={form.tutor} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Serviço</label>
              <input name="servico" value={form.servico} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Valor (R$) *</label>
              <input name="valor" type="number" step="0.01" value={form.valor} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Desconto (R$)</label>
              <input name="desconto" type="number" step="0.01" value={form.desconto} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Data *</label>
              <input name="data" type="date" value={form.data} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Vencimento</label>
              <input name="vencimento" type="date" value={form.vencimento} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Forma de Pagamento</label>
              <select name="formaPagamento" value={form.formaPagamento} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione...</option>
                <option value="Dinheiro">💵 Dinheiro</option>
                <option value="Cartão de Crédito">💳 Cartão de Crédito</option>
                <option value="Cartão de Débito">💳 Cartão de Débito</option>
                <option value="PIX">📱 PIX</option>
                <option value="Boleto">📄 Boleto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors">
              Salvar Cobrança
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Lista */}
        <div className={selecionada ? "w-1/2" : "w-full"}>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row gap-3">
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Pesquisar por pet ou tutor..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
              <option value="">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Pago">Pago</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {filtradas.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">💰</p>
                <p className="font-medium">Nenhuma cobrança encontrada</p>
                <p className="text-sm mt-1">Clique em + Nova Cobrança para começar</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-teal-50 text-teal-700 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4">Pet / Tutor</th>
                    <th className="text-left px-6 py-4">Serviço</th>
                    <th className="text-left px-6 py-4">Valor</th>
                    <th className="text-left px-6 py-4">Data</th>
                    <th className="text-left px-6 py-4">Status</th>
                    <th className="text-left px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtradas.map((c) => (
                    <tr key={c.id}
                      onClick={() => setSelecionada(c)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selecionada?.id === c.id ? "bg-teal-50" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-700">{c.pet}</p>
                        <p className="text-xs text-gray-400">{c.tutor}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{c.servico || "—"}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-700">R$ {(c.valor - c.desconto).toFixed(2)}</p>
                        {c.desconto > 0 && (
                          <p className="text-xs text-gray-400 line-through">R$ {c.valor.toFixed(2)}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(c.data).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={(e) => { e.stopPropagation(); handleDeletar(c.id) }}
                          className="text-red-400 hover:text-red-600 text-sm font-medium">
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Detalhe */}
        {selecionada && (
          <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Detalhes da Cobrança</h3>
              <button onClick={() => setSelecionada(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Valor destaque */}
            <div className="bg-teal-50 rounded-2xl p-4 mb-5 text-center">
              <p className="text-sm text-gray-400 mb-1">Valor Total</p>
              <p className="text-3xl font-bold text-teal-700">
                R$ {(selecionada.valor - selecionada.desconto).toFixed(2)}
              </p>
              {selecionada.desconto > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  Desconto de R$ {selecionada.desconto.toFixed(2)} aplicado
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Pet</span>
                <span className="font-medium text-gray-700">{selecionada.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tutor</span>
                <span className="font-medium text-gray-700">{selecionada.tutor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Serviço</span>
                <span className="font-medium text-gray-700">{selecionada.servico || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="font-medium text-gray-700">
                  {new Date(selecionada.data).toLocaleDateString("pt-BR")}
                </span>
              </div>
              {selecionada.vencimento && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Vencimento</span>
                  <span className="font-medium text-gray-700">
                    {new Date(selecionada.vencimento).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              )}
              {selecionada.formaPagamento && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Pagamento</span>
                  <span className="font-medium text-gray-700">{selecionada.formaPagamento}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selecionada.status]}`}>
                  {selecionada.status}
                </span>
              </div>
            </div>

            {/* Alterar Status */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-2">Alterar Status</p>
              <div className="flex gap-2">
                {(["Pendente", "Pago", "Cancelado"] as Cobranca["status"][]).map((s) => (
                  <button key={s}
                    onClick={() => handleAlterarStatus(selecionada.id, s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      selecionada.status === s
                        ? "bg-teal-500 text-white border-teal-500"
                        : "border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}