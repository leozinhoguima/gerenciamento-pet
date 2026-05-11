"use client"

import React, { useState } from "react"

type Prescricao = {
  id: number
  pet: string
  tutor: string
  veterinario: string
  data: string
  medicamentos: Medicamento[]
  observacoes: string
}

type Medicamento = {
  id: number
  nome: string
  dosagem: string
  frequencia: string
  duracao: string
  instrucoes: string
}

export default function PrescricaoPage() {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selecionada, setSelecionada] = useState<Prescricao | null>(null)
  const [busca, setBusca] = useState("")
  const [form, setForm] = useState({
    pet: "",
    tutor: "",
    veterinario: "",
    data: "",
    observacoes: "",
  })
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [medForm, setMedForm] = useState({
    nome: "",
    dosagem: "",
    frequencia: "",
    duracao: "",
    instrucoes: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleMedChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMedForm({ ...medForm, [e.target.name]: e.target.value })
  }

  function adicionarMedicamento() {
    if (!medForm.nome || !medForm.dosagem) {
      alert("Informe o nome e dosagem do medicamento!")
      return
    }
    setMedicamentos([...medicamentos, { id: Date.now(), ...medForm }])
    setMedForm({ nome: "", dosagem: "", frequencia: "", duracao: "", instrucoes: "" })
  }

  function removerMedicamento(id: number) {
    setMedicamentos(medicamentos.filter((m) => m.id !== id))
  }

  function handleSubmit() {
    if (!form.pet || !form.tutor || !form.data || medicamentos.length === 0) {
      alert("Preencha os campos obrigatórios e adicione pelo menos um medicamento!")
      return
    }
    const nova: Prescricao = { id: Date.now(), ...form, medicamentos }
    setPrescricoes([...prescricoes, nova])
    setForm({ pet: "", tutor: "", veterinario: "", data: "", observacoes: "" })
    setMedicamentos([])
    setShowForm(false)
  }

  function handleDeletar(id: number) {
    if (confirm("Deseja remover esta prescrição?")) {
      setPrescricoes(prescricoes.filter((p) => p.id !== id))
      if (selecionada?.id === id) setSelecionada(null)
    }
  }

  const filtradas = prescricoes.filter(
    (p) =>
      p.pet.toLowerCase().includes(busca.toLowerCase()) ||
      p.tutor.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">💊 Prescrição</h2>
        <button
          onClick={() => { setShowForm(!showForm); setSelecionada(null) }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          {showForm ? "✕ Cancelar" : "+ Nova Prescrição"}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Nova Prescrição</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nome do Pet *</label>
              <input name="pet" value={form.pet} onChange={handleChange} placeholder="Ex: Rex"
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
              <label className="text-sm text-gray-500 mb-1 block">Data *</label>
              <input name="data" type="date" value={form.data} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Observações Gerais</label>
              <textarea name="observacoes" value={form.observacoes} onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 resize-none" />
            </div>
          </div>

          {/* Medicamentos */}
          <div className="border border-gray-100 rounded-2xl p-4 mb-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-3">➕ Adicionar Medicamento *</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Nome do Medicamento *</label>
                <input name="nome" value={medForm.nome} onChange={handleMedChange}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Dosagem *</label>
                <input name="dosagem" value={medForm.dosagem} onChange={handleMedChange} 
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Frequência</label>
                <input name="frequencia" value={medForm.frequencia} onChange={handleMedChange} 
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Duração</label>
                <input name="duracao" value={medForm.duracao} onChange={handleMedChange} 
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 mb-1 block">Instruções</label>
                <input name="instrucoes" value={medForm.instrucoes} onChange={handleMedChange} 
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 text-sm" />
              </div>
            </div>
            <button onClick={adicionarMedicamento}
              className="bg-teal-50 hover:bg-teal-100 text-teal-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              + Adicionar Medicamento
            </button>

            {/* Lista de medicamentos adicionados */}
            {medicamentos.length > 0 && (
              <div className="mt-4 space-y-2">
                {medicamentos.map((m) => (
                  <div key={m.id} className="flex items-center justify-between bg-teal-50 rounded-xl px-4 py-2">
                    <div>
                      <span className="font-medium text-teal-700 text-sm">{m.nome}</span>
                      <span className="text-gray-400 text-xs ml-2">{m.dosagem}</span>
                      {m.frequencia && <span className="text-gray-400 text-xs ml-2">• {m.frequencia}</span>}
                      {m.duracao && <span className="text-gray-400 text-xs ml-2">• {m.duracao}</span>}
                    </div>
                    <button onClick={() => removerMedicamento(m.id)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium ml-4">
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors">
              Salvar Prescrição
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Lista */}
        <div className={selecionada ? "w-1/2" : "w-full"}>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Pesquisar por pet ou tutor..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {filtradas.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">💊</p>
                <p className="font-medium">Nenhuma prescrição encontrada</p>
                <p className="text-sm mt-1">Clique em + Nova Prescrição para começar</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-teal-50 text-teal-700 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4">Pet</th>
                    <th className="text-left px-6 py-4">Tutor</th>
                    <th className="text-left px-6 py-4">Veterinário</th>
                    <th className="text-left px-6 py-4">Data</th>
                    <th className="text-left px-6 py-4">Medicamentos</th>
                    <th className="text-left px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtradas.map((p) => (
                    <tr key={p.id}
                      onClick={() => setSelecionada(p)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selecionada?.id === p.id ? "bg-teal-50" : ""}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">{p.pet}</td>
                      <td className="px-6 py-4 text-gray-500">{p.tutor}</td>
                      <td className="px-6 py-4 text-gray-500">{p.veterinario || "—"}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(p.data).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                          {p.medicamentos.length} item(s)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeletar(p.id) }}
                          className="text-red-400 hover:text-red-600 text-sm font-medium"
                        >
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
              <h3 className="text-lg font-semibold text-gray-700">Detalhes da Prescrição</h3>
              <button onClick={() => setSelecionada(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">Pet</span>
                <span className="font-medium text-gray-700">{selecionada.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tutor</span>
                <span className="font-medium text-gray-700">{selecionada.tutor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Veterinário</span>
                <span className="font-medium text-gray-700">{selecionada.veterinario || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="font-medium text-gray-700">
                  {new Date(selecionada.data).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-600 mb-3">💊 Medicamentos</h4>
            <div className="space-y-3">
              {selecionada.medicamentos.map((m) => (
                <div key={m.id} className="bg-teal-50 rounded-xl p-4">
                  <p className="font-semibold text-teal-700">{m.nome} — {m.dosagem}</p>
                  {m.frequencia && <p className="text-xs text-gray-500 mt-1">🕐 {m.frequencia}</p>}
                  {m.duracao && <p className="text-xs text-gray-500">📅 {m.duracao}</p>}
                  {m.instrucoes && <p className="text-xs text-gray-500">📝 {m.instrucoes}</p>}
                </div>
              ))}
            </div>

            {selecionada.observacoes && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-1">Observações</p>
                <p className="text-gray-700 bg-gray-50 rounded-xl p-3 text-sm">{selecionada.observacoes}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}