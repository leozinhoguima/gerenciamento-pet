"use client"

import React, { useState } from "react"

type Consulta = {
  id: number
  pet: string
  tutor: string
  veterinario: string
  data: string
  hora: string
  motivo: string
  diagnostico: string
  observacoes: string
  status: "Agendada" | "Em Andamento" | "Concluída" | "Cancelada"
}

const statusColors: Record<string, string> = {
  Agendada: "bg-yellow-100 text-yellow-700",
  "Em Andamento": "bg-blue-100 text-blue-700",
  Concluída: "bg-green-100 text-green-700",
  Cancelada: "bg-red-100 text-red-600",
}

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [showForm, setShowForm] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [form, setForm] = useState({
    pet: "",
    tutor: "",
    veterinario: "",
    data: "",
    hora: "",
    motivo: "",
    diagnostico: "",
    observacoes: "",
    status: "Agendada" as Consulta["status"],
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.pet || !form.tutor || !form.data || !form.hora) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const nova: Consulta = { id: Date.now(), ...form }
    setConsultas([...consultas, nova])
    setForm({
      pet: "", tutor: "", veterinario: "", data: "", hora: "",
      motivo: "", diagnostico: "", observacoes: "", status: "Agendada",
    })
    setShowForm(false)
  }

  function handleDeletar(id: number) {
    if (confirm("Deseja remover esta consulta?")) {
      setConsultas(consultas.filter((c) => c.id !== id))
      if (consultaSelecionada?.id === id) setConsultaSelecionada(null)
    }
  }

  function handleAlterarStatus(id: number, status: Consulta["status"]) {
    setConsultas(consultas.map((c) => c.id === id ? { ...c, status } : c))
    if (consultaSelecionada?.id === id) setConsultaSelecionada({ ...consultaSelecionada, status })
  }

  const filtradas = consultas.filter((c) => {
    const matchBusca =
      c.pet.toLowerCase().includes(busca.toLowerCase()) ||
      c.tutor.toLowerCase().includes(busca.toLowerCase()) ||
      c.veterinario.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus ? c.status === filtroStatus : true
    return matchBusca && matchStatus
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">🩺 Consultas</h2>
        <button
          onClick={() => { setShowForm(!showForm); setConsultaSelecionada(null) }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          {showForm ? "✕ Cancelar" : "+ Nova Consulta"}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Nova Consulta</h3>
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
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Veterinário</label>
              <input name="veterinario" value={form.veterinario} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="Agendada">Agendada</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
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
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Diagnóstico</label>
              <textarea name="diagnostico" value={form.diagnostico} onChange={handleChange}
                   rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Observações Adicionais</label>
              <textarea name="observacoes" value={form.observacoes} onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors">
              Salvar Consulta
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Lista */}
        <div className={consultaSelecionada ? "w-1/2" : "w-full"}>
          {/* Filtros */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row gap-3">
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Pesquisar por pet, tutor ou veterinário..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
              <option value="">Todos os status</option>
              <option value="Agendada">Agendada</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {filtradas.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">🩺</p>
                <p className="font-medium">Nenhuma consulta encontrada</p>
                <p className="text-sm mt-1">Clique em + Nova Consulta para começar</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-teal-50 text-teal-700 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4">Pet</th>
                    <th className="text-left px-6 py-4">Tutor</th>
                    <th className="text-left px-6 py-4">Data</th>
                    <th className="text-left px-6 py-4">Status</th>
                    <th className="text-left px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtradas.map((c) => (
                    <tr key={c.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${consultaSelecionada?.id === c.id ? "bg-teal-50" : ""}`}
                      onClick={() => setConsultaSelecionada(c)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">{c.pet}</td>
                      <td className="px-6 py-4 text-gray-500">{c.tutor}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(c.data).toLocaleDateString("pt-BR")} {c.hora}
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
        {consultaSelecionada && (
          <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Detalhes da Consulta</h3>
              <button onClick={() => setConsultaSelecionada(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Pet</span>
                <span className="font-medium text-gray-700">{consultaSelecionada.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tutor</span>
                <span className="font-medium text-gray-700">{consultaSelecionada.tutor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Veterinário</span>
                <span className="font-medium text-gray-700">{consultaSelecionada.veterinario || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="font-medium text-gray-700">
                  {new Date(consultaSelecionada.data).toLocaleDateString("pt-BR")} às {consultaSelecionada.hora}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Motivo</span>
                <span className="font-medium text-gray-700">{consultaSelecionada.motivo || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[consultaSelecionada.status]}`}>
                  {consultaSelecionada.status}
                </span>
              </div>
              {consultaSelecionada.diagnostico && (
                <div>
                  <p className="text-gray-400 mb-1">Diagnóstico</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{consultaSelecionada.diagnostico}</p>
                </div>
              )}
              {consultaSelecionada.observacoes && (
                <div>
                  <p className="text-gray-400 mb-1">Observações</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{consultaSelecionada.observacoes}</p>
                </div>
              )}
            </div>
            {/* Alterar Status */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-2">Alterar Status</p>
              <div className="flex flex-wrap gap-2">
                {(["Agendada", "Em Andamento", "Concluída", "Cancelada"] as Consulta["status"][]).map((s) => (
                  <button key={s}
                    onClick={() => handleAlterarStatus(consultaSelecionada.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      consultaSelecionada.status === s
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