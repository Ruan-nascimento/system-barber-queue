import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const barbers = await prisma.barber.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        status: true,
      },
    });
    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Erro ao listar barbeiros:", error);
    return NextResponse.json({ error: "Erro ao buscar barbeiros" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || typeof name !== "string" || name.length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }

    const newBarber = await prisma.barber.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json(newBarber, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar barbeiro:", error);
    return NextResponse.json({ error: "Erro ao adicionar barbeiro" }, { status: 500 });
  }
}