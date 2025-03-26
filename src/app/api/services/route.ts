import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      select: {
        id: true,
        service: true,
        value: true,
        lengthService: true,
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json({ error: "Erro ao buscar serviços" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}