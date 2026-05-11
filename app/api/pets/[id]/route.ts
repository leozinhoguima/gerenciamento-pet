import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Deleta consultas vinculadas ao pet
    await prisma.consulta.deleteMany({ where: { petId: id } })

    // Deleta o pet
    await prisma.pet.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("ERRO AO DELETAR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}