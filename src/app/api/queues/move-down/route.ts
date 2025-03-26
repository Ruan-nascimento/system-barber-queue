import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { queueId } = await request.json();

    if (!queueId) {
      return NextResponse.json({ error: "queueId é obrigatório" }, { status: 400 });
    }

    const currentQueue = await prisma.queue.findUnique({
      where: { id: queueId },
      include: { barber: true },
    });

    if (!currentQueue || currentQueue.status !== "waiting") {
      return NextResponse.json({ error: "Fila não encontrada ou não está em espera" }, { status: 404 });
    }

    const nextQueue = await prisma.queue.findFirst({
      where: {
        barberId: currentQueue.barberId,
        position: currentQueue.position + 1,
        status: "waiting",
      },
    });

    if (!nextQueue) {
      return NextResponse.json({ error: "Não há próximo na fila" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.queue.update({
        where: { id: queueId },
        data: { position: nextQueue.position },
      }),
      prisma.queue.update({
        where: { id: nextQueue.id },
        data: { position: currentQueue.position },
      }),
    ]);

    return NextResponse.json({ message: "Posição alterada com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao mover para baixo:", error);
    return NextResponse.json({ error: "Erro ao mover para baixo" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}