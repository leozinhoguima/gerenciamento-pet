import Link from "next/link"

export default function InicioPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Bem-vindo ao Pet Care 🐾
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Clientes", value: "0", icon: "👤", color: "bg-teal-500" },
          { label: "Pets", value: "0", icon: "🐾", color: "bg-orange-400" },
          { label: "Consultas Hoje", value: "0", icon: "🩺", color: "bg-blue-400" },
          { label: "Cobranças Pendentes", value: "0", icon: "💰", color: "bg-red-400" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
            <div className={`${card.color} rounded-xl p-3`}>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className="text-2xl font-bold text-gray-700">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-gray-600 mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Novo Cliente", icon: "👤", href: "/clientes" },
          { label: "Novo Pet", icon: "🐾", href: "/pets" },
          { label: "Agendar", icon: "📅", href: "/agendamentos" },
          { label: "Prontuário", icon: "📋", href: "/prontuario" },
          { label: "Produtos", icon: "📦", href: "/produtos" },
          { label: "Relatórios", icon: "📊", href: "/relatorios" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center gap-3 hover:bg-teal-50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span className="text-3xl">{action.icon}</span>
            <span className="text-xs font-medium text-gray-600 text-center">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}