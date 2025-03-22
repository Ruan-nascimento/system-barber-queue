import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Telefone já cadastrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name[0].toUpperCase() + name.slice(1),
        phone,
        email: email || null,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}