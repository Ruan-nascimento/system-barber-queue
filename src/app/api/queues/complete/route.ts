import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { queueId } = await request.json();

    if (!queueId) {
      return NextResponse.json({ error: "queueId é obrigatório" }, { status: 400 });
    }

    const updatedQueue = await prisma.queue.update({
      where: { id: queueId },
      data: {
        status: "completed",
        position: 0,
      },
    });

    return NextResponse.json(updatedQueue, { status: 200 });
  } catch (error) {
    console.error("Erro ao concluir fila:", error);
    return NextResponse.json({ error: "Erro ao concluir fila" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}