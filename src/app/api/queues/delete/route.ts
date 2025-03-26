import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { queueId } = await request.json();

    if (!queueId) {
      return NextResponse.json({ error: "queueId é obrigatório" }, { status: 400 });
    }

    await prisma.queue.delete({
      where: { id: queueId },
    });

    return NextResponse.json({ message: "Fila removida com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao remover fila:", error);
    return NextResponse.json({ error: "Erro ao remover fila" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}