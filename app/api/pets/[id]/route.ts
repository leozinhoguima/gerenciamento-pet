import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.pet.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar pet" }, { status: 500 })
  }
}