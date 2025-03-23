-- CreateTable
CREATE TABLE "BarberShopStatus" (
    "id" TEXT NOT NULL DEFAULT '1',
    "status" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarberShopStatus_pkey" PRIMARY KEY ("id")
);
