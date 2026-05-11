"use client"

import React, { useState, useEffect } from "react"

type Cliente = { id: string; nome: string }
type Pet = {
  id: string
  nome: string
  especie: string
  raca: string
  sexo: string
  nascimento: string
  clienteId: string
  cliente: Cliente
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [showForm, setShowForm] = useState(false)
  const [busca, setBusca] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "", especie: "", raca: "", sexo: "", nascimento: "", clienteId: "",
  })

  useEffect(() => {
    carregarPets()
    carregarClientes()
  }, [])

  async function carregarPets() {
    setLoading(true)
    const res = await fetch("/api/pets")
    const data = await res.json()
    setPets(data)
    setLoading(false)
  }

  async function carregarClientes() {
    const res = await fetch("/api/clientes")
    const data = await res.json()
    setClientes(data)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.nome || !form.especie || !form.sexo || !form.clienteId) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const res = await fetch("/api/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ nome: "", especie: "", raca: "", sexo: "", nascimento: "", clienteId: "" })
      setShowForm(false)
      carregarPets()
    } else {
      const data = await res.json()
      alert(data.error || "Erro ao salvar pet")
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deseja remover este pet?")) return
    await fetch(`/api/pets/${id}`, { method: "DELETE" })
    carregarPets()
  }

  const especieIcon = (especie: string) => {
    if (especie === "Cão") return "🐶"
    if (especie === "Gato") return "🐱"
    if (especie === "Pássaro") return "🐦"
    if (especie === "Coelho") return "🐰"
    return "🐾"
  }

  const petsFiltrados = pets.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.cliente?.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">🐾 Pets</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          {showForm ? "✕ Cancelar" : "+ Novo Pet"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Novo Pet</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nome do Pet *</label>
              <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do pet"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Tutor (Cliente) *</label>
              <select name="clienteId" value={form.clienteId} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione o tutor...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Espécie *</label>
              <select name="especie" value={form.especie} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione...</option>
                <option value="Cão">🐶 Cão</option>
                <option value="Gato">🐱 Gato</option>
                <option value="Pássaro">🐦 Pássaro</option>
                <option value="Coelho">🐰 Coelho</option>
                <option value="Outro">🐾 Outro</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Raça</label>
              <input name="raca" value={form.raca} onChange={handleChange} placeholder="Raça"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Sexo *</label>
              <select name="sexo" value={form.sexo} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione...</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Data de Nascimento</label>
              <input name="nascimento" type="date" value={form.nascimento} onChange={handleChange}
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
              Salvar Pet
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <input value={busca} onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Pesquisar por nome do pet ou tutor..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⏳</p>
          <p className="font-medium">Carregando pets...</p>
        </div>
      ) : petsFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🐾</p>
          <p className="font-medium">Nenhum pet cadastrado</p>
          <p className="text-sm mt-1">Clique em Novo Pet para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {petsFiltrados.map((pet) => (
            <div key={pet.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-teal-50 rounded-xl p-3 text-3xl">{especieIcon(pet.especie)}</div>
                <div>
                  <h4 className="font-bold text-gray-700 text-lg">{pet.nome}</h4>
                  <p className="text-sm text-gray-400">{pet.especie} {pet.raca ? `• ${pet.raca}` : ""}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <p>👤 Tutor: <span className="text-gray-700 font-medium">{pet.cliente?.nome}</span></p>
                <p>⚥ Sexo: <span className="text-gray-700">{pet.sexo}</span></p>
                {pet.nascimento && (
                  <p>🎂 Nascimento: <span className="text-gray-700">{new Date(pet.nascimento).toLocaleDateString("pt-BR")}</span></p>
                )}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 text-center text-teal-500 hover:text-teal-700 text-sm font-medium py-1.5 rounded-lg hover:bg-teal-50 transition-colors">
                  Editar
                </button>
                <button onClick={() => handleDeletar(pet.id)}
                  className="flex-1 text-center text-red-400 hover:text-red-600 text-sm font-medium py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}