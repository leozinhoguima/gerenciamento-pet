import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: "desc" },
      include: { pets: true },
    })
    return NextResponse.json(clientes)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, cpf, telefone, email, endereco } = body

    if (!nome || !cpf || !telefone) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const cliente = await prisma.cliente.create({
      data: { nome, cpf, telefone, email, endereco },
    })
    return NextResponse.json(cliente, { status: 201 })
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "CPF já cadastrado" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 })
  }
}