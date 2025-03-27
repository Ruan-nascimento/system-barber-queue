import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const waitingQueues = await prisma.queue.findMany({
      where: {
        status: "waiting",
      },
      select: {
        userId: true,
        status: true, 
      },
    });

    return NextResponse.json(waitingQueues, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários na fila com status 'waiting':", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários na fila" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}