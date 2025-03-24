"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { DateSelect } from "@/app/_components/dateSelect";
import { Card } from "@/app/_components/cards";
import { ServiceChart } from "@/app/_components/serviceChart/indes";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { Spinner } from "@/app/_components/spinner";

export const DashboardPage = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<boolean>(false);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [queueCount, setQueueCount] = useState<number>(0);
  const [topServices, setTopServices] = useState<
    { name: string; count: number }[]
  >([]);
  const [isLoadingSales, setIsLoadingSales] = useState<boolean>(true);
  const [isLoadingQueue, setIsLoadingQueue] = useState<boolean>(true);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  const getLocalDate = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate;
  };

  const today = getLocalDate(new Date());
  const defaultEndDate = getLocalDate(new Date());
  today.setDate(today.getDate() - 14);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/\./g, ",");
  };

  const parseJSONResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Esperado JSON, mas recebido: ${text.substring(0, 50)}...`);
    }
  };

  useEffect(() => {
    const fetchBarberShopStatus = async () => {
      setIsLoadingStatus(true);
      try {
        console.log("Buscando status da barbearia em:", `${API_URL}/api/barbershop/status`);
        const response = await fetch(`${API_URL}/api/barberShop/status`);
        console.log("Status da resposta:", response.status);
        const data = await parseJSONResponse(response);
        if (response.ok) {
          setStatus(data.status);
        } else {
          console.error("Erro ao buscar o status da barbearia:", data.error);
          setStatus(false);
        }
      } catch (error) {
        console.error("Erro ao buscar o status da barbearia:", error);
        setStatus(false);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    fetchBarberShopStatus();
  }, []);

  const updateBarberShopStatus = async (newStatus: boolean) => {
    setIsUpdatingStatus(true);
    try {
      console.log("Atualizando status da barbearia para:", newStatus);
      const response = await fetch(`${API_URL}/api/barberShop/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      console.log("Status da resposta de atualização:", response.status);
      const data = await parseJSONResponse(response);
      if (response.ok) {
        setStatus(data.status);
      } else {
        console.error("Erro ao atualizar o status da barbearia:", data.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar o status da barbearia:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  useEffect(() => {
    const fetchTotalSales = async () => {
      setIsLoadingSales(true);
      try {
        const response = await fetch(
          `${API_URL}/api/payments/total?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const data = await parseJSONResponse(response);
        if (response.ok) {
          setTotalSales(data.totalValue);
        } else {
          console.error("Erro ao buscar as vendas totais:", data.error);
          setTotalSales(0);
        }
      } catch (error) {
        console.error("Erro ao buscar as vendas totais:", error);
        setTotalSales(0);
      } finally {
        setIsLoadingSales(false);
      }
    };

    fetchTotalSales();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchQueueCount = async () => {
      setIsLoadingQueue(true);
      try {
        const response = await fetch(`${API_URL}/api/queues/count`);
        const data = await parseJSONResponse(response);
        if (response.ok) {
          setQueueCount(data.count);
        } else {
          console.error("Erro ao buscar a contagem da fila:", data.error);
          setQueueCount(0);
        }
      } catch (error) {
        console.error("Erro ao buscar a contagem da fila:", error);
        setQueueCount(0);
      } finally {
        setIsLoadingQueue(false);
      }
    };

    fetchQueueCount();
  }, []);

  useEffect(() => {
    const fetchTopServices = async () => {
      setIsLoadingServices(true);
      try {
        const response = await fetch(
          `${API_URL}/api/services/top?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const data = await parseJSONResponse(response);
        if (response.ok) {
          setTopServices(data.topServices);
        } else {
          console.error("Erro ao buscar os principais serviços:", data.error);
          setTopServices([]);
        }
      } catch (error) {
        console.error("Erro ao buscar os principais serviços:", error);
        setTopServices([]);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchTopServices();
  }, [startDate, endDate]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (

      <section className="w-full max-w-[1400px] h-full p-10 flex flex-col overflow-auto custom-scrollbar">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
          <Card>
            <span className="text-zinc-300/60">Suas Vendas</span>
            {isLoadingSales ? (
              <div className="mt-4">
                <Spinner />
              </div>
            ) : (
              <>
                <span className="text-2xl lg:text-4xl mt-4 text-blue-600">
                  {formatCurrency(totalSales)}
                </span>
                <span className="text-xs opacity-55 mt-8">
                  Valor apenas de Serviços Confirmados...
                </span>
              </>
            )}
          </Card>

          <Card>
            <span className="text-zinc-300/60">Pessoas na Fila</span>
            {isLoadingQueue ? (
              <div className="mt-4">
                <Spinner />
              </div>
            ) : (
              <span className="text-4xl lg:text-7xl mt-4 text-blue-600">{queueCount}</span>
            )}
          </Card>

          <Card>
            <span className="text-zinc-300/60">Top 3 Serviços</span>
            {isLoadingServices ? (
              <div className="mt-4">
                <Spinner />
              </div>
            ) : topServices.length > 0 ? (
              topServices.map((service, index) => (
                <span key={index} className="text-sm mt-2 block">
                  {index + 1}. {service.name} - {service.count}
                </span>
              ))
            ) : (
              <span className="text-sm mt-2 block">Nenhum serviço encontrado</span>
            )}
          </Card>

          <Card>
            <span className="text-zinc-300/60">Status da Barbearia</span>
            {isLoadingStatus ? (
              <div className="mt-4">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="relative">
                  <span className="text-blue-600 text-xl lg:text-4xl mt-2">
                    {status ? "Aberto" : "Fechado"}
                  </span>
                  <span
                    className={`w-4 h-4 absolute rounded-full right-0 top-[50%] transform -translate-y-1/2 ${
                      status ? "bg-green-700 pulse-glow-green" : "bg-red-700 pulse-glow-red"
                    }`}
                  ></span>
                </div>
                <Button
                  onClick={() => updateBarberShopStatus(!status)}
                  className="bg-blue-600 mt-4 duration-200 ease-in-out hover:bg-blue-600/90 active:bg-blue-600/80 cursor-pointer flex items-center justify-center"
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? (
                    <Spinner />
                  ) : (
                    <>{status ? "Fechar.." : "Abrir..."}.</>
                  )}
                </Button>
              </>
            )}
          </Card>
        </div>

        <ServiceChart endDate={endDate} startDate={startDate} />
      </section>
  );
};