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
      include: {
        user: true,
        barber: true,
        queueServices: {
          include: { service: true },
        },
      },
    })

    if (!queueEntry) {
      return NextResponse.json(
        { error: "Entrada na fila não encontrada" },
        { status: 404 }
      )
    }

    const totalValue = queueEntry.queueServices.reduce(
      (sum, qs) => sum + qs.service.price,
      0
    )

    await prisma.history.create({
      data: {
        userId: queueEntry.userId,
        barberId: queueEntry.barberId,
        totalValue,
        historyServices: {
          create: queueEntry.queueServices.map((qs) => ({
            serviceId: qs.serviceId,
          })),
        },
      },
    })

    await prisma.queue.update({
      where: { id: queueId },
      data: { status: "completed" },
    })

    return NextResponse.json(
      { message: "Serviço concluído com sucesso" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao finalizar serviço:", error)
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    )
  }
}