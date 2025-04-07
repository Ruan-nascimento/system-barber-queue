import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const barberId = params.id;
    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        status: true,
      },
    });

    if (!barber) {
      return NextResponse.json({ error: "Barbeiro não encontrado" }, { status: 404 });
    }

    return NextResponse.json(barber, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar barbeiro:", error);
    return NextResponse.json({ error: "Erro ao buscar barbeiro" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const barberId = params.id;
    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      return NextResponse.json({ error: "Barbeiro não encontrado" }, { status: 404 });
    }

    await prisma.barber.delete({
      where: { id: barberId },
    });

    return NextResponse.json({ message: "Barbeiro excluído com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir barbeiro:", error);
    return NextResponse.json({ error: "Erro ao excluir barbeiro" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("barberToken");

    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const barberId = params.id;
    const { status } = await req.json();

    if (!status || !["active", "inactive"].includes(status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 });
    }

    const barber = await prisma.barber.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      return NextResponse.json({ error: "Barbeiro não encontrado" }, { status: 404 });
    }

    const updatedBarber = await prisma.barber.update({
      where: { id: barberId },
      data: { status },
      select: {
        id: true,
        name: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json(updatedBarber, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar barbeiro:", error);
    return NextResponse.json({ error: "Erro ao atualizar barbeiro" }, { status: 500 });
  }
}