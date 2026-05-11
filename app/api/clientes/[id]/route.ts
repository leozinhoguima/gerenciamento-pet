import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { nome, cpf, telefone, email, endereco } = body

    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: { nome, cpf, telefone, email, endereco },
    })
    return NextResponse.json(cliente)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.cliente.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar cliente" }, { status: 500 })
  }
}