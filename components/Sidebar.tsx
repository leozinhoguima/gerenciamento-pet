"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { label: "Início", href: "/inicio", icon: "🏠" },
  { label: "Clientes", href: "/clientes", icon: "👤" },
  { label: "Pets", href: "/pets", icon: "🐾" },
  { label: "Agendamentos", href: "/agendamentos", icon: "📅" },
  { label: "Consultas", href: "/consultas", icon: "🩺" },
  { label: "Prontuário", href: "/prontuario", icon: "📋" },
  { label: "Prescrição", href: "/prescricao", icon: "💊" },
  { label: "Produtos", href: "/produtos", icon: "📦" },
  { label: "Cobranças", href: "/cobranca", icon: "💰" },
  { label: "Relatórios", href: "/relatorios", icon: "📊" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
        <div className="bg-teal-500 rounded-full p-2">
          <span className="text-2xl">🐾</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-teal-700">PET CARE</h1>
          <p className="text-xs text-gray-400">Clínica Veterinária</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-teal-50 hover:text-teal-600"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé */}
      <div className="px-6 py-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors">
          <span>🚪</span> Sair
        </button>
      </div>
    </aside>
  )
}