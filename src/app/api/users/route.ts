import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientCount = await prisma.user.count({
      where: {
        role: "client",
      },
    });

    return NextResponse.json({ count: clientCount }, { status: 200 });
  } catch (error) {
    console.error("Erro ao contar clientes ativos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}