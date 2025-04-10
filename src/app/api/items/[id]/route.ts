import { prisma } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const item = await prisma.items.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Item deletado com sucesso', item }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar item' }, { status: 500 });
  }
}