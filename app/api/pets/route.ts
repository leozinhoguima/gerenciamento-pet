import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
      orderBy: { createdAt: "desc" },
      include: { cliente: true },
    })
    return NextResponse.json(pets)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar pets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, especie, raca, sexo, nascimento, clienteId } = body

    if (!nome || !especie || !sexo || !clienteId) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const pet = await prisma.pet.create({
      data: {
        nome,
        especie,
        raca,
        sexo,
        nascimento: nascimento ? new Date(nascimento) : null,
        clienteId,
      },
    })
    return NextResponse.json(pet, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar pet" }, { status: 500 })
  }
}