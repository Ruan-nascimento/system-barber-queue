"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { Icon } from "@/app/_components/buttonMenuBar/icon";
import { DropdownMenuBarbers } from "./dropDownSelectBarbers";
import { Spinner } from "@/app/_components/spinner";
import { QueueTable } from "./queueTable";

export type Barber = {
  id: number;
  name: string;
};

type Queue = {
    id: string;
    user: { name: string };
    services: { service: string; value: number }[];
    position: number;
    status: string;
  };

export const QueuesAdmin = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(true);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [loadingQueues, setLoadingQueues] = useState(false);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/barbers`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setBarbers(data);
        }
      } catch (error) {
        console.error("Erro ao buscar barbeiros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);


  useEffect(() => {
    if (selectedBarber) {
      const fetchQueues = async () => {
        setLoadingQueues(true);
        try {
          const response = await fetch(`${API_URL}/api/queues?barberId=${selectedBarber.id}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setQueues(data);
          }
        } catch (error) {
          console.error("Erro ao buscar filas:", error);
        } finally {
          setLoadingQueues(false);
        }
      };

      fetchQueues();
    } else {
      setQueues([]);
    }
  }, [selectedBarber]);

  const tableHeaders = ["Pos", "Nome", "Serviços", "Valor", "Ações"];
  const tableRows = queues.map((queue) => [
    `${queue.position +1}º`,
    queue.user.name,
    queue.services.map((s:any) => s.service.service).join(", "),
    `R$ ${queue.services
      .reduce((acc, s:any) => acc + s.service.value, 0)
      .toFixed(2)}`,
    "",
  ]);

  return (
    <section className="flex flex-col gap-2 w-full h-full">
        <DropdownMenuBarbers barbers={barbers} loading={loading} selectedBarber={selectedBarber} setSelectedBarber={setSelectedBarber}/>

      {
        loading ? <Spinner/> :
        loadingQueues ? (
            <div className="text-center text-zinc-200">Carregando filas...</div>
          ) : queues.length > 0 ? (
            <QueueTable headers={tableHeaders} rows={tableRows} />
          ) : (
            <div className="text-center text-zinc-200">
              Nenhuma fila encontrada para este barbeiro.
            </div>
          )}
    </section>
  );
};