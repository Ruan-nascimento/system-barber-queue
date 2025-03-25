import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const barberId = searchParams.get("barberId");

  if (!barberId) {
    return NextResponse.json({ error: "barberId é obrigatório" }, { status: 400 });
  }

  try {
    const queues = await prisma.queue.findMany({
      where: {
        barberId: parseInt(barberId),
        status: "waiting",
      },
      include: {
        user: { select: { name: true } },
        services: {
          include: {
            service: { select: { service: true, value: true } }, 
          },
        },
      },
      orderBy: { position: "asc" },
    });
    return NextResponse.json(queues);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar filas" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}