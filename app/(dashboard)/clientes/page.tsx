"use client"

import React, { useState, useEffect } from "react"

type Cliente = {
  id: string
  nome: string
  cpf: string
  telefone: string
  email: string
  endereco: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [showForm, setShowForm] = useState(false)
  const [busca, setBusca] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "", cpf: "", telefone: "", email: "", endereco: "",
  })

  useEffect(() => {
    carregarClientes()
  }, [])

  async function carregarClientes() {
    setLoading(true)
    const res = await fetch("/api/clientes")
    const data = await res.json()
    setClientes(data)
    setLoading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.nome || !form.cpf || !form.telefone) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ nome: "", cpf: "", telefone: "", email: "", endereco: "" })
      setShowForm(false)
      carregarClientes()
    } else {
      const data = await res.json()
      alert(data.error || "Erro ao salvar cliente")
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deseja remover este cliente?")) return
    await fetch(`/api/clientes/${id}`, { method: "DELETE" })
    carregarClientes()
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cpf.includes(busca)
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">👤 Clientes</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
        >
          {showForm ? "✕ Cancelar" : "+ Novo Cliente"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Novo Cliente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nome completo *</label>
              <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">CPF *</label>
              <input name="cpf" value={form.cpf} onChange={handleChange} placeholder=""
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Telefone *</label>
              <input name="telefone" value={form.telefone} onChange={handleChange} placeholder=""
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">E-mail</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Endereço</label>
              <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número, bairro, cidade"
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
              Salvar Cliente
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <input value={busca} onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Pesquisar por nome ou CPF..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">⏳</p>
            <p className="font-medium">Carregando clientes...</p>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">👤</p>
            <p className="font-medium">Nenhum cliente cadastrado</p>
            <p className="text-sm mt-1">Clique em Novo Cliente para começar</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-teal-50 text-teal-700 text-sm">
              <tr>
                <th className="text-left px-6 py-4">Nome</th>
                <th className="text-left px-6 py-4">CPF</th>
                <th className="text-left px-6 py-4">Telefone</th>
                <th className="text-left px-6 py-4">E-mail</th>
                <th className="text-left px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{cliente.nome}</td>
                  <td className="px-6 py-4 text-gray-500">{cliente.cpf}</td>
                  <td className="px-6 py-4 text-gray-500">{cliente.telefone}</td>
                  <td className="px-6 py-4 text-gray-500">{cliente.email || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-teal-500 hover:text-teal-700 text-sm font-medium">Editar</button>
                      <button onClick={() => handleDeletar(cliente.id)}
                        className="text-red-400 hover:text-red-600 text-sm font-medium">Deletar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}