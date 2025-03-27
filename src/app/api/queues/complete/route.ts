import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { queueId } = await request.json();

    if (!queueId) {
      return NextResponse.json({ error: "queueId é obrigatório" }, { status: 400 });
    }

    const queue = await prisma.queue.findUnique({
      where: { id: queueId },
      include: {
        user: true, 
        services: {
          include: {
            service: true, 
          },
        },
      },
    });

    if (!queue) {
      return NextResponse.json({ error: "Registro da fila não encontrado" }, { status: 404 });
    }


    const totalValue = queue.services.reduce(
      (sum, queueService) => sum + queueService.service.value,
      0
    );


    const [updatedQueue, newPayment] = await prisma.$transaction([

      prisma.queue.update({
        where: { id: queueId },
        data: {
          status: "completed",
          position: 0,
        },
      }),

      prisma.payments.create({
        data: {
          userId: queue.userId,
          barberId: queue.barberId!,
          totalValue,
          createdAt: new Date(),
          services: {
            create: queue.services.map((queueService) => ({
              serviceId: queueService.serviceId,
            })),
          },
        },
      }),
    ]);

    return NextResponse.json({ updatedQueue, newPayment }, { status: 200 });
  } catch (error) {
    console.error("Erro ao concluir fila e criar pagamento:", error);
    return NextResponse.json({ error: "Erro ao concluir fila" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}