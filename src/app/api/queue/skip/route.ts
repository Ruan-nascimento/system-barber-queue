import { NextResponse } from "next/server"
import { prisma } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const { queueId } = await request.json()

    if (!queueId) {
      return NextResponse.json(
        { error: "ID da entrada na fila é obrigatório" },
        { status: 400 }
      )
    }

    const queueEntry = await prisma.queue.findUnique({
      where: { id: queueId },
    })

    if (!queueEntry) {
      return NextResponse.json(
        { error: "Entrada na fila não encontrada" },
        { status: 404 }
      )
    }
    await prisma.queue.update({
      where: { id: queueId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(
      { message: "Usuário movido para a última posição com sucesso" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao pular usuário:", error)
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    )
  }
}