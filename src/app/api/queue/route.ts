import { NextResponse } from "next/server"
import { prisma } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const queues = await prisma.queue.findMany({
      where: {
        status: { in: ["waiting", "in_progress"] },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        barber: {
          select: {
            id: true,
            name: true,
          },
        },
        queueServices: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                price: true,
                averageTime: true,
              },
            },
          },
        },
      },
      orderBy: [
        { barberId: "asc" }, 
        { updatedAt: "desc" }, 
      ],
    })

    return NextResponse.json(queues, { status: 200 })
  } catch (error) {
    console.error("Erro ao listar a fila:", error)
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    )
  }
}