import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const produto = await prisma.produto.update({
      where: { id: params.id },
      data: { estoque: body.estoque },
    })
    return NextResponse.json(produto)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.produto.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
  }
}