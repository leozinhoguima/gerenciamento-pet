"use client"

import React, { useState, useEffect } from "react"

type Pet = { id: string; nome: string; cliente: { nome: string } }
type Agendamento = {
  id: string
  petId: string
  pet: Pet
  data: string
  motivo: string
  status: string
}

const statusColors: Record<string, string> = {
  AGENDADA: "bg-yellow-100 text-yellow-700",
  CONFIRMADA: "bg-blue-100 text-blue-700",
  CANCELADA: "bg-red-100 text-red-600",
  CONCLUIDA: "bg-green-100 text-green-700",
}

const statusLabel: Record<string, string> = {
  AGENDADA: "Agendada",
  CONFIRMADA: "Confirmada",
  CANCELADA: "Cancelada",
  CONCLUIDA: "Concluída",
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [showForm, setShowForm] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    petId: "", data: "", hora: "", motivo: "", status: "AGENDADA",
  })

  useEffect(() => {
    carregarAgendamentos()
    carregarPets()
  }, [])

  async function carregarAgendamentos() {
    setLoading(true)
    const res = await fetch("/api/agendamentos")
    const data = await res.json()
    setAgendamentos(data)
    setLoading(false)
  }

  async function carregarPets() {
    const res = await fetch("/api/pets")
    const data = await res.json()
    setPets(data)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.petId || !form.data || !form.hora) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const res = await fetch("/api/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ petId: "", data: "", hora: "", motivo: "", status: "AGENDADA" })
      setShowForm(false)
      carregarAgendamentos()
    } else {
      const data = await res.json()
      alert(data.error || "Erro ao salvar")
    }
  }

  async function handleAlterarStatus(id: string, status: string) {
    await fetch(`/api/agendamentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    carregarAgendamentos()
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deseja remover este agendamento?")) return
    await fetch(`/api/agendamentos/${id}`, { method: "DELETE" })
    carregarAgendamentos()
  }

  const filtrados = agendamentos.filter((a) => {
    const matchBusca =
      a.pet?.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.pet?.cliente?.nome.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus ? a.status === filtroStatus : true
    return matchBusca && matchStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">📅 Agendamentos</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          {showForm ? "✕ Cancelar" : "+ Novo Agendamento"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Novo Agendamento</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Pet *</label>
              <select name="petId" value={form.petId} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione o pet...</option>
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>{p.nome} ({p.cliente?.nome})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="AGENDADA">Agendada</option>
                <option value="CONFIRMADA">Confirmada</option>
                <option value="CANCELADA">Cancelada</option>
                <option value="CONCLUIDA">Concluída</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Data *</label>
              <input name="data" type="date" value={form.data} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Hora *</label>
              <input name="hora" type="time" value={form.hora} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Motivo</label>
              <input name="motivo" value={form.motivo} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors">
              Salvar Agendamento
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex gap-3">
        <input value={busca} onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Pesquisar por pet ou tutor..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
          <option value="">Todos os status</option>
          <option value="AGENDADA">Agendada</option>
          <option value="CONFIRMADA">Confirmada</option>
          <option value="CANCELADA">Cancelada</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">⏳</p>
            <p className="font-medium">Carregando agendamentos...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">Nenhum agendamento encontrado</p>
            <p className="text-sm mt-1">Clique em Novo Agendamento para começar</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-teal-50 text-teal-700 text-sm">
              <tr>
                <th className="text-left px-6 py-4">Pet</th>
                <th className="text-left px-6 py-4">Tutor</th>
                <th className="text-left px-6 py-4">Data</th>
                <th className="text-left px-6 py-4">Hora</th>
                <th className="text-left px-6 py-4">Motivo</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrados.map((a) => {
                const dataHora = new Date(a.data)
                return (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700">{a.pet?.nome}</td>
                    <td className="px-6 py-4 text-gray-500">{a.pet?.cliente?.nome}</td>
                    <td className="px-6 py-4 text-gray-500">{dataHora.toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4 text-gray-500">{dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="px-6 py-4 text-gray-500">{a.motivo || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[a.status]}`}>
                        {statusLabel[a.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {a.status === "AGENDADA" && (
                          <button onClick={() => handleAlterarStatus(a.id, "CONFIRMADA")}
                            className="text-blue-400 hover:text-blue-600 text-sm font-medium">Confirmar</button>
                        )}
                        {a.status !== "CANCELADA" && a.status !== "CONCLUIDA" && (
                          <button onClick={() => handleAlterarStatus(a.id, "CANCELADA")}
                            className="text-orange-400 hover:text-orange-600 text-sm font-medium">Cancelar</button>
                        )}
                        <button onClick={() => handleDeletar(a.id)}
                          className="text-red-400 hover:text-red-600 text-sm font-medium">Deletar</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}