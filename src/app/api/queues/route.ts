import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { userId, barberId, serviceIds, estimatedTime } = await request.json();


    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const tokenExpiration = new Date();
    tokenExpiration.setDate(tokenExpiration.getDate() + 90);

    const tokenId = uuidv4();

    await prisma.user.update({
      where: { id: userId },
      data: {
        tokenId,
        tokenExpiration,
      },
    });

    const waitingCount = await prisma.queue.count({
      where: {
        barberId,
        status: "waiting",
      },
    });

    const existingQueue = await prisma.queue.findFirst({
      where: {
        userId,
        status: "completed",
      },
    });

    let queue;

    if (existingQueue) {
      queue = await prisma.queue.update({
        where: {
          id: existingQueue.id,
        },
        data: {
          status: "waiting",
          position: waitingCount + 1,
          barberId,
          estimatedTime,
          services: {
            deleteMany: {},
            create: serviceIds.map((serviceId: number) => ({
              serviceId,
            })),
          },
        },
      });
    } else {
      queue = await prisma.queue.create({
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
    }

    return NextResponse.json(queue, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar/atualizar na fila:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar/atualizar na fila" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}