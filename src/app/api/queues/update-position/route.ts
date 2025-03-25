import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const { queueId, newPosition, nextQueueId, nextQueueNewPosition } = await request.json();

  if (!queueId || !newPosition || !nextQueueId || !nextQueueNewPosition) {
    return NextResponse.json({ error: "Parâmetros obrigatórios ausentes" }, { status: 400 });
  }

  try {
    await prisma.$transaction([
      prisma.queue.update({
        where: { id: queueId },
        data: { position: newPosition },
      }),
      prisma.queue.update({
        where: { id: nextQueueId },
        data: { position: nextQueueNewPosition },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar posições:", error);
    return NextResponse.json({ error: "Erro ao atualizar posições" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}