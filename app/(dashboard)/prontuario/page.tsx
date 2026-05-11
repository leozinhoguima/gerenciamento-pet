"use client"

import React, { useState } from "react"

type Prontuario = {
  id: number
  pet: string
  tutor: string
  veterinario: string
  data: string
  diagnostico: string
  tratamento: string
  observacoes: string
  peso: string
  temperatura: string
  pressao: string
}

export default function ProntuarioPage() {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selecionado, setSelecionado] = useState<Prontuario | null>(null)
  const [busca, setBusca] = useState("")
  const [form, setForm] = useState({
    pet: "",
    tutor: "",
    veterinario: "",
    data: "",
    diagnostico: "",
    tratamento: "",
    observacoes: "",
    peso: "",
    temperatura: "",
    pressao: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if (!form.pet || !form.tutor || !form.data || !form.diagnostico) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const novo: Prontuario = { id: Date.now(), ...form }
    setProntuarios([...prontuarios, novo])
    setForm({
      pet: "", tutor: "", veterinario: "", data: "", diagnostico: "",
      tratamento: "", observacoes: "", peso: "", temperatura: "", pressao: "",
    })
    setShowForm(false)
  }

  function handleDeletar(id: number) {
    if (confirm("Deseja remover este prontuário?")) {
      setProntuarios(prontuarios.filter((p) => p.id !== id))
      if (selecionado?.id === id) setSelecionado(null)
    }
  }

  const filtrados = prontuarios.filter(
    (p) =>
      p.pet.toLowerCase().includes(busca.toLowerCase()) ||
      p.tutor.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">📋 Prontuário</h2>
        <button
          onClick={() => { setShowForm(!showForm); setSelecionado(null) }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          {showForm ? "✕ Cancelar" : "+ Novo Prontuário"}
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Novo Prontuário</h3>
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
              <label className="text-sm text-gray-500 mb-1 block">Data *</label>
              <input name="data" type="date" value={form.data} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>

            {/* Sinais Vitais */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Peso (kg)</label>
              <input name="peso" value={form.peso} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Temperatura (°C)</label>
              <input name="temperatura" value={form.temperatura} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Pressão</label>
              <input name="pressao" value={form.pressao} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Diagnóstico *</label>
              <textarea name="diagnostico" value={form.diagnostico} onChange={handleChange}
                 rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Tratamento</label>
              <textarea name="tratamento" value={form.tratamento} onChange={handleChange}
                 rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50 resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Observações Adiconais</label>
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
              Salvar Prontuário
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {/* Lista */}
        <div className={selecionado ? "w-1/2" : "w-full"}>
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
            <input value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="🔍 Pesquisar por pet ou tutor..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {filtrados.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📋</p>
                <p className="font-medium">Nenhum prontuário encontrado</p>
                <p className="text-sm mt-1">Clique em + Novo Prontuário para começar</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-teal-50 text-teal-700 text-sm">
                  <tr>
                    <th className="text-left px-6 py-4">Pet</th>
                    <th className="text-left px-6 py-4">Tutor</th>
                    <th className="text-left px-6 py-4">Veterinário</th>
                    <th className="text-left px-6 py-4">Data</th>
                    <th className="text-left px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtrados.map((p) => (
                    <tr key={p.id}
                      onClick={() => setSelecionado(p)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${selecionado?.id === p.id ? "bg-teal-50" : ""}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">{p.pet}</td>
                      <td className="px-6 py-4 text-gray-500">{p.tutor}</td>
                      <td className="px-6 py-4 text-gray-500">{p.veterinario || "—"}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(p.data).toLocaleDateString("pt-BR")}
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
        {selecionado && (
          <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Ficha do Prontuário</h3>
              <button onClick={() => setSelecionado(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Sinais Vitais */}
            {(selecionado.peso || selecionado.temperatura || selecionado.pressao) && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {selecionado.peso && (
                  <div className="bg-teal-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Peso</p>
                    <p className="font-bold text-teal-700">{selecionado.peso} kg</p>
                  </div>
                )}
                {selecionado.temperatura && (
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Temperatura</p>
                    <p className="font-bold text-orange-600">{selecionado.temperatura}°C</p>
                  </div>
                )}
                {selecionado.pressao && (
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Pressão</p>
                    <p className="font-bold text-blue-600">{selecionado.pressao}</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Pet</span>
                <span className="font-medium text-gray-700">{selecionado.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tutor</span>
                <span className="font-medium text-gray-700">{selecionado.tutor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Veterinário</span>
                <span className="font-medium text-gray-700">{selecionado.veterinario || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="font-medium text-gray-700">
                  {new Date(selecionado.data).toLocaleDateString("pt-BR")}
                </span>
              </div>
              {selecionado.diagnostico && (
                <div>
                  <p className="text-gray-400 mb-1">Diagnóstico</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{selecionado.diagnostico}</p>
                </div>
              )}
              {selecionado.tratamento && (
                <div>
                  <p className="text-gray-400 mb-1">Tratamento</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{selecionado.tratamento}</p>
                </div>
              )}
              {selecionado.observacoes && (
                <div>
                  <p className="text-gray-400 mb-1">Observações</p>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{selecionado.observacoes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}