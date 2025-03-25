import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(barbers);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar barbeiros" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}