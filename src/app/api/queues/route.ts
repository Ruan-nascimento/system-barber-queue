import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, barberId, serviceIds, estimatedTime } = await request.json();

    const waitingCount = await prisma.queue.count({
      where: {
        barberId,
        status: "waiting",
      },
    });

    const queue = await prisma.queue.create({
      data: {
        userId,
        barberId,
        status: "waiting",
        position: waitingCount + 1,
        estimatedTime,
        services: {
          create: serviceIds.map((serviceId: number) => ({
            serviceId,
          })),
        },
      },
    });

    return NextResponse.json(queue, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar à fila:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar à fila" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}