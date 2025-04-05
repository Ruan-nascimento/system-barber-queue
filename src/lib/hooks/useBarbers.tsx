import { useState, useEffect } from "react";
import { API_URL } from "../utils";

export interface Barber {
  id: string;
  name: string;
}

export const useBarbers = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBarbers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/barbers`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar barbeiros: ${response.status} ${response.statusText}`);
      }
      const data: Barber[] = await response.json();
      setBarbers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return { barbers, loading, error, refetch: fetchBarbers };
};