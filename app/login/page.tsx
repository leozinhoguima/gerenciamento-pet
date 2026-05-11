"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !senha) {
      setErro("Preencha e-mail e senha!")
      return
    }
    setLoading(true)
    setErro("")

    const result = await signIn("credentials", {
      email,
      password: senha,
      redirect: false,
    })

    if (result?.ok) {
      router.push("/inicio")
    } else {
      setErro("E-mail ou senha incorretos!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-teal-500 rounded-full p-4 mb-3">
            <span className="text-4xl">🐾</span>
          </div>
          <h1 className="text-2xl font-bold text-teal-700">PET CARE</h1>
          <p className="text-gray-400 text-sm mt-1">Clínica Veterinária</p>
        </div>

        {erro && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4 text-center">
            {erro}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 bg-gray-50" />
          </div>
          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold py-3 rounded-xl transition-colors duration-200">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 Pet Care — Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}