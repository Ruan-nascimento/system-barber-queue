import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get("barberId");

    if (!barberId) {
      return NextResponse.json(
        { error: "barberId é obrigatório" },
        { status: 400 }
      );
    }

    const queues = await prisma.queue.findMany({
      where: {
        barberId: Number(barberId),
        status: "waiting",
      },
      select: {
        id: true,
        position: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
        services: {
          select: {
            service: {
              select: {
                service: true, 
                value: true, 
              },
            },
          },
        },
      },
      orderBy: {
        position: 'asc'
      }
    });

    const formattedQueues = queues.map((queue) => ({
      id: queue.id,
      position: queue.position,
      status: queue.status,
      user: { name: queue.user.name },
      services: queue.services.map((s) => ({
        service: s.service.service,
        value: s.service.value,
      })),
    }));

    return NextResponse.json(formattedQueues, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar filas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar filas" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}