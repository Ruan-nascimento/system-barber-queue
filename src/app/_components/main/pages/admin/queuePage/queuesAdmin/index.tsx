"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
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

export type QueueProps = {
  data: Queue[]
}

export const QueuesAdmin = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(true);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loadingQueues, setLoadingQueues] = useState(false);

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

  const fetchQueues = async () => {
    if (!selectedBarber) {
      setQueues([]);
      return;
    }
    setLoadingQueues(true);
    try {
      const response = await fetch(`${API_URL}/api/queues/queue-for-barber?barberId=${selectedBarber.id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar filas");
      }
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

  useEffect(() => {
    fetchBarbers();
  }, []);

  useEffect(() => {
    fetchQueues();
  }, [selectedBarber]);

  return (
    <section className="flex flex-col gap-2 w-full h-full">
      <DropdownMenuBarbers
        barbers={barbers}
        loading={loading}
        selectedBarber={selectedBarber}
        setSelectedBarber={setSelectedBarber}
      />

      {loading ? (
        <Spinner />
      ) : loadingQueues ? (
        <div className="text-center text-zinc-200">Carregando filas...</div>
      ) : queues.length > 0 ? (
        <QueueTable data={queues} onUpdate={fetchQueues} />
      ) : (
        <div className="text-center text-zinc-200">
          Nenhuma fila encontrada para este barbeiro.
        </div>
      )}
    </section>
  );
};