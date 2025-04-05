import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const barbers = await prisma.barber.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Erro ao listar barbeiros:", error);
    return NextResponse.json(
      { error: "Erro ao buscar barbeiros" },
      { status: 500 }
    );
  }
}