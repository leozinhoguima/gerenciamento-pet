"use client"

import React, { useState, useEffect } from "react"

type Produto = {
  id: string
  nome: string
  estoque: number
  preco: number
  descricao?: string
}

const categorias = ["Medicamento", "Vacina", "Acessório", "Alimento", "Higiene", "Outro"]

const categoriaColors: Record<string, string> = {
  Medicamento: "bg-blue-100 text-blue-700",
  Vacina: "bg-green-100 text-green-700",
  Acessório: "bg-purple-100 text-purple-700",
  Alimento: "bg-orange-100 text-orange-700",
  Higiene: "bg-teal-100 text-teal-700",
  Outro: "bg-gray-100 text-gray-600",
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [showForm, setShowForm] = useState(false)
  const [busca, setBusca] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: "", categoria: "", estoque: "", preco: "", descricao: "",
  })

  useEffect(() => { carregarProdutos() }, [])

  async function carregarProdutos() {
    setLoading(true)
    const res = await fetch("/api/produtos")
    const data = await res.json()
    setProdutos(data)
    setLoading(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!form.nome || !form.preco) {
      alert("Preencha os campos obrigatórios!")
      return
    }
    const res = await fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ nome: "", categoria: "", estoque: "", preco: "", descricao: "" })
      setShowForm(false)
      carregarProdutos()
    } else {
      const data = await res.json()
      alert(data.error || "Erro ao salvar produto")
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Deseja remover este produto?")) return
    await fetch(`/api/produtos/${id}`, { method: "DELETE" })
    carregarProdutos()
  }

  async function handleAtualizarEstoque(id: string, estoque: number) {
    await fetch(`/api/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estoque }),
    })
    carregarProdutos()
  }

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const totalProdutos = produtos.length
  const estoqueTotal = produtos.reduce((acc, p) => acc + p.estoque, 0)
  const estoqueBaixo = produtos.filter((p) => p.estoque <= 5).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700">📦 Produtos</h2>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          {showForm ? "✕ Cancelar" : "+ Novo Produto"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-teal-500 rounded-xl p-3"><span className="text-2xl">📦</span></div>
          <div>
            <p className="text-sm text-gray-400">Total de Produtos</p>
            <p className="text-2xl font-bold text-gray-700">{totalProdutos}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-blue-400 rounded-xl p-3"><span className="text-2xl">🗃️</span></div>
          <div>
            <p className="text-sm text-gray-400">Itens em Estoque</p>
            <p className="text-2xl font-bold text-gray-700">{estoqueTotal}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="bg-red-400 rounded-xl p-3"><span className="text-2xl">⚠️</span></div>
          <div>
            <p className="text-sm text-gray-400">Estoque Baixo</p>
            <p className="text-2xl font-bold text-gray-700">{estoqueBaixo}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Novo Produto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Nome do Produto *</label>
              <input name="nome" value={form.nome} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Categoria</label>
              <select name="categoria" value={form.categoria} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
                <option value="">Selecione...</option>
                {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Estoque</label>
              <input name="estoque" type="number" value={form.estoque} onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Preço (R$) *</label>
              <input name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1 block">Descrição</label>
              <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição do produto..."
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
              Salvar Produto
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 flex gap-3">
        <input value={busca} onChange={(e) => setBusca(e.target.value)}
          placeholder="🔍 Pesquisar produto..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50" />
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50">
          <option value="">Todas as categorias</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">⏳</p>
            <p className="font-medium">Carregando produtos...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-medium">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">Clique em Novo Produto para começar</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-teal-50 text-teal-700 text-sm">
              <tr>
                <th className="text-left px-6 py-4">Produto</th>
                <th className="text-left px-6 py-4">Estoque</th>
                <th className="text-left px-6 py-4">Preço</th>
                <th className="text-left px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrados.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-700">{p.nome}</p>
                    {p.descricao && <p className="text-xs text-gray-400 mt-0.5">{p.descricao}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleAtualizarEstoque(p.id, Math.max(0, p.estoque - 1))}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center">−</button>
                      <span className={`font-medium w-8 text-center ${p.estoque <= 5 ? "text-red-500" : "text-gray-700"}`}>{p.estoque}</span>
                      <button onClick={() => handleAtualizarEstoque(p.id, p.estoque + 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center">+</button>
                      {p.estoque <= 5 && <span className="text-xs text-red-400 font-medium">⚠️ Baixo</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">R$ {p.preco.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeletar(p.id)}
                      className="text-red-400 hover:text-red-600 text-sm font-medium">Deletar</button>
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