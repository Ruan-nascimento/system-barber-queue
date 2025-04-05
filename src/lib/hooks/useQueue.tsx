import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  price: number;
  averageTime: number;
}

interface QueueService {
  service: Service;
}

interface User {
  id: string;
  name: string;
  phone: string;
}

interface Barber {
  id: string;
  name: string;
}

export interface QueueEntry {
  id: string;
  userId: string;
  user: User;
  barberId: string;
  barber: Barber;
  status: "waiting" | "completed" | "canceled";
  createdAt: string;
  updatedAt: string;
  queueServices: QueueService[];
}

export const useQueue = () => {
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/queue`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar a fila");
      }
      const data: QueueEntry[] = await response.json();

      const waitingEntries = data
        .filter((entry) => entry.status === "waiting")
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      setQueueEntries(waitingEntries);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { queueEntries, loading, error, refetch: fetchData };
};