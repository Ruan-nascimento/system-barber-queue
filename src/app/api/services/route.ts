import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        averageTime: true,
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    return NextResponse.json(
      { error: "Erro ao buscar serviços" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, averageTime } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "Nome do serviço é obrigatório" },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { message: "Preço deve ser um número maior que 0" },
        { status: 400 }
      );
    }

    if (typeof averageTime !== "number" || averageTime <= 0) {
      return NextResponse.json(
        { message: "Tempo médio deve ser um número maior que 0" },
        { status: 400 }
      );
    }

    const newService = await prisma.service.create({
      data: {
        name: name.trim(),
        price,
        averageTime,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar serviço:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar serviço" },
      { status: 500 }
    );
  }
}