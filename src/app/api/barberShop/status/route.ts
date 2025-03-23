import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const barberShopStatus = await prisma.barberShopStatus.findUnique({
      where: {
        id: "1",
      },
    });

    if (!barberShopStatus) {
      const newStatus = await prisma.barberShopStatus.create({
        data: {
          id: "1",
          status: false,
        },
      });
      return NextResponse.json({ status: newStatus.status }, { status: 200 });
    }

    return NextResponse.json({ status: barberShopStatus.status }, { status: 200 });
  } catch (error) {
    console.error("Error fetching barbershop status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
    try {
      const { status } = await request.json();
  
      if (typeof status !== "boolean") {
        return NextResponse.json(
          { error: "Status must be a boolean" },
          { status: 400 }
        );
      }
  
      const updatedStatus = await prisma.barberShopStatus.upsert({
        where: {
          id: "1",
        },
        update: {
          status,
        },
        create: {
          id: "1",
          status,
        },
      });
  
      return NextResponse.json({ status: updatedStatus.status }, { status: 200 });
    } catch (error) {
      console.error("Error updating barbershop status:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }