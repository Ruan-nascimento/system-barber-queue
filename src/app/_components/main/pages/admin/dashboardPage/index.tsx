"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { DateSelect } from "@/app/_components/dateSelect";
import { ServiceChart } from "@/app/_components/serviceChart";
import { API_URL, handleScrollToTop } from "@/lib/utils";
import { TotalValue } from "@/app/_components/cards/totalValue";
import { PeoplesInQueue } from "@/app/_components/cards/peoplesInQueue";
import { CurrentClients } from "@/app/_components/cards/currentClients";
import { BarberStatus } from "@/app/_components/cards/barberStatus";
import { Notification } from "@/app/_components/notifications/buttonBell";
import { NotificationModal } from "@/app/_components/notifications/notificationModal";
import { NotificationProvider } from "@/lib/NotificationContext";

export const DashboardPage = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<boolean>(false);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [queueCount, setQueueCount] = useState<number>(0);
  const [clientCount, setClientCount] = useState<number>(0)
  const [isLoadingSales, setIsLoadingSales] = useState<boolean>(true);
  const [isLoadingQueue, setIsLoadingQueue] = useState<boolean>(true);
  const [isLoadingClients, setIsLoadingClients] = useState<boolean>(true);
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

  const fetchClientCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/count-clients`);
      const data = await parseJSONResponse(response);
      if (response.ok) {
        return data.count;
      } else {
        console.error("Erro ao buscar a contagem de clientes:", data.error);
        return 0;
      }
    } catch (error) {
      console.error("Erro ao buscar a contagem de clientes:", error);
      return 0;
    }
  };

  const fetchBarberShopStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/barberShop/status`); 
      console.log("Status da resposta:", response.status);
      const data = await parseJSONResponse(response);
      if (response.ok) {
        return data.status;
      } else {
        console.error("Erro ao buscar o status da barbearia:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Erro ao buscar o status da barbearia:", error);
      return false;
    }
  };

  const updateBarberShopStatus = async (newStatus: boolean) => {
    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`${API_URL}/api/barberShop/status`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
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

  const fetchTotalSales = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/payments/total?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await parseJSONResponse(response);
      if (response.ok) {
        return data.totalValue;
      } else {
        console.error("Erro ao buscar as vendas totais:", data.error);
        return 0;
      }
    } catch (error) {
      console.error("Erro ao buscar as vendas totais:", error);
      return 0;
    }
  };


  const fetchQueueCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/queues/count`);
      const data = await parseJSONResponse(response);
      if (response.ok) {
        return data.count;
      } else {
        console.error("Erro ao buscar a contagem da fila:", data.error);
        return 0;
      }
    } catch (error) {
      console.error("Erro ao buscar a contagem da fila:", error);
      return 0;
    }
  };

  useEffect(() => {
    const loadClientCount = async () => {
      setIsLoadingClients(true);
      const newClientCount = await fetchClientCount();
      setClientCount(newClientCount);
      setIsLoadingClients(false);
    };

    loadClientCount();
  }, []);


  useEffect(() => {
    const pollStatus = async () => {
      setIsLoadingStatus(true);
      const newStatus = await fetchBarberShopStatus();
      if (newStatus !== status) {
        setStatus(newStatus);
      }
      setIsLoadingStatus(false);
    };


    pollStatus();


   
  }, [status]);
  useEffect(() => {
    const loadTotalSales = async () => {
      setIsLoadingSales(true);
      const newTotalSales = await fetchTotalSales();
      setTotalSales(newTotalSales);
      setIsLoadingSales(false);
    };

    loadTotalSales();
  }, [startDate, endDate]);
  useEffect(() => {
    const loadQueueCount = async () => {
      setIsLoadingQueue(true);
      const newQueueCount = await fetchQueueCount();
      setQueueCount(newQueueCount);
      setIsLoadingQueue(false);
    };

    loadQueueCount();
  }, []); 

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
      <NotificationProvider>
      <section className="w-full mt-20 lg:mt-0 relative max-w-[1400px] p-6 h-full lg:px-10 flex flex-col overflow-auto custom-scrollbar">
        <h1 className="flex items-center gap-4 text-2xl lg:text-3xl">
          Olá <b className="text-blue-600 flex-1 overflow-clip">{user?.name}</b>
          <Notification/>
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

          <NotificationModal/>
          
          <TotalValue formatCurrency={formatCurrency} isLoadingSales={isLoadingSales} totalSales={totalSales}/>

          <PeoplesInQueue isLoadingQueue={isLoadingQueue} queueCount={queueCount}/>

          <CurrentClients clientCount={clientCount} isLoadingClients={isLoadingClients}/>

          <BarberStatus isUpdatingStatus={isUpdatingStatus} status={status} updateBarberShopStatus={updateBarberShopStatus} />
          
        </div>

        <ServiceChart endDate={endDate} startDate={startDate} />

      </section>
      </NotificationProvider>
  );
};