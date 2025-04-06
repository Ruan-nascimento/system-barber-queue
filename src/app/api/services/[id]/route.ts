import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ message: "Serviço não encontrado" }, { status: 404 });
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Serviço apagado com sucesso" });
  } catch (error) {
    console.error("Erro ao apagar serviço:", error);
    return NextResponse.json({ error: "Erro ao apagar serviço" }, { status: 500 });
  }
}