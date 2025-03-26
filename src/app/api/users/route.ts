import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "client",
      },
      select: {
        id: true,
        name: true,
        phone: true,
      },
      orderBy: {name: 'asc'}
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}