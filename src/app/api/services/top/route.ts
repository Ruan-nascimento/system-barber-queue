import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "startDate and endDate are required" },
      { status: 400 }
    );
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

 
    const topServices = await prisma.queueService.groupBy({
      by: ["serviceId"],
      _count: {
        serviceId: true,
      },
      where: {
        queue: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      },
      orderBy: {
        _count: {
          serviceId: "desc",
        },
      },
      take: 3, 
    });

    const serviceIds = topServices.map((item) => item.serviceId);
    const services = await prisma.services.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
      select: {
        id: true,
        service: true,
      },
    });

    const result = topServices.map((item) => {
      const service = services.find((s) => s.id === item.serviceId);
      return {
        name: service?.service || "Desconhecido",
        count: item._count.serviceId,
      };
    });

    return NextResponse.json({ topServices: result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching top services:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}