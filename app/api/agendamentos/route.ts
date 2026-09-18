import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const consultas = await prisma.consulta.findMany({
      orderBy: { createdAt: "desc" },
      include: { pet: { include: { cliente: true } } },
    })
    return NextResponse.json(consultas)
} catch (error) {
  console.error("Erro ao buscar agendamentos:", error)
  return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 })
}
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { petId, data, hora, motivo, status } = body

    if (!petId || !data || !hora) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const dataHora = new Date(`${data}T${hora}:00`)

    const consulta = await prisma.consulta.create({
      data: {
        petId,
        data: dataHora,
        motivo,
        status: status || "AGENDADA",
      },
      include: { pet: { include: { cliente: true } } },
    })
    return NextResponse.json(consulta, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 })
  }
}