import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  const senha = await bcrypt.hash("admin123", 10)
  
  const user = await prisma.user.upsert({
    where: { email: "admin@petcare.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@petcare.com",
      password: senha,
      role: "ADMIN",
    },
  })

  return NextResponse.json({ message: "Usuário criado!", user: { email: user.email } })
}