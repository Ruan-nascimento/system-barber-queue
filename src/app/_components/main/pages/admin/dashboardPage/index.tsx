"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { DateSelect } from "@/app/_components/dateSelect";
import { Card } from "@/app/_components/cards";


export const DashboardPage = () => {
  const { user } = useAuth();

  const getLocalDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate;
  };

  const today = getLocalDate(new Date());
  const defaultEndDate = getLocalDate(new Date(today));
  defaultEndDate.setDate(today.getDate() + 14);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/\./g, ",");
  };

  return (
    <section className="w-full max-w-[1400px] h-full p-10 flex flex-col">
      <h1 className="text-2xl lg:text-3xl">
        Olá <b className="text-blue-600">{user?.name}</b>
      </h1>

      <div className="mt-6 w-full justify-center">
        <DateSelect
        endDate={endDate}
        formatDate={formatDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        />
      </div>

        <div className="grid grid-cols-2 md:grid-cols-3 mt-6 gap-4">
            
            <Card>
                <span className="text-zinc-300/60">Suas Vendas</span>

                <span className="text-4xl mt-4 text-green-600">R$ 0,00</span>

                <span className="text-xs opacity-55 mt-8">Valor apenas de Serviços Confirmados...</span>

            </Card>

            <Card>
                <span className="text-zinc-300/60">Pessoas na Fila</span>

                <span className="text-4xl mt-4">10</span>

                <span className="text-xs opacity-55 mt-8">Valor apenas de Serviços Confirmados...</span>

            </Card>

            <Card>
                <span className="text-zinc-300/60">Top 3 Serviços</span>

                <span className="text-sm mt-2">1. Degradê - 23</span>
                <span className="text-sm mt-2">2. Nevou - 13</span>
                <span className="text-sm mt-2">3. Mullet - 9</span>

            </Card>

        </div>

    </section>
  );
};