import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { prisma } from "@/lib/utils";
import * as jwt from 'jsonwebtoken'

export async function POST(request: Request) {
    const secret = process.env.JWT_SECRET as string || "X7GmP9LqT2VwZ8B5nK1Y4CdR6FsJ3NxAoMHQDpWtCU"

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

    await prisma.notification.create({
      data: {
        message: `Novo Usuário Cadastrado! ${user.name}`,
      },
    });

    const token = jwt.sign(
        {id: user.id, phone: user.phone},
        secret,
        {expiresIn: '30d'}
        
    )

    const response = NextResponse.json(
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role
      },
      { status: 201 }
    );

    response.cookies.set('barberToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
    })

    return response

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}