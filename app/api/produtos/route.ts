import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(produtos)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, categoria, estoque, preco, descricao } = body

    if (!nome || !preco) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        categoria: categoria || null,
        descricao: descricao || null,
        estoque: Number(estoque) || 0,
        preco: Number(preco),
      },
    })
    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}