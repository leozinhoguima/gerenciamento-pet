import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { nome, cpf, telefone, email, endereco } = body

    const cliente = await prisma.cliente.update({
      where: { id },
      data: { nome, cpf, telefone, email, endereco },
    })
    return NextResponse.json(cliente)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Busca todos os pets do cliente
    const pets = await prisma.pet.findMany({ where: { clienteId: id } })
    const petIds = pets.map((p) => p.id)

    // Deleta consultas vinculadas aos pets
    await prisma.consulta.deleteMany({ where: { petId: { in: petIds } } })

    // Deleta os pets
    await prisma.pet.deleteMany({ where: { clienteId: id } })

    // Deleta o cliente
    await prisma.cliente.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("ERRO AO DELETAR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}