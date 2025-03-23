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

    const total = await prisma.payments.aggregate({
      _sum: {
        totalValue: true,
      },
      where: {
        createdAt: {
          gte: start,
          lte: end, 
        },
      },
    });

    const totalValue = total._sum.totalValue || 0;

    return NextResponse.json({ totalValue }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}