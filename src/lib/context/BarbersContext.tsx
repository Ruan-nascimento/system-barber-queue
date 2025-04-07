import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_URL } from "../utils";

export interface Barber {
  id: string;
  name: string;
  createdAt: Date;
  status: string;
}

interface BarbersContextType {
  barbers: Barber[];
  loading: boolean;
  error: string | null;
  addBarber: (name: string) => Promise<Barber>;
  deleteBarber: (id: string) => Promise<void>;
  toggleBarberStatus: (id: string, currentStatus: string) => Promise<void>;
  refetch: () => Promise<void>;
  refetchStatus: (id: string) => Promise<void>;
}

const BarbersContext = createContext<BarbersContextType | undefined>(undefined);

export const BarbersProvider = ({ children }: { children: ReactNode }) => {
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

  const addBarber = async (name: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/barbers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(`Erro ao adicionar barbeiro: ${response.status} ${response.statusText}`);
      }
      const newBarber: Barber = await response.json();
      setBarbers((prevBarbers) => [...prevBarbers, newBarber]);
      setError(null);
      return newBarber;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBarber = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/barbers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir barbeiro: ${response.status} ${response.statusText}`);
      }
      setBarbers((prevBarbers) => prevBarbers.filter((barber) => barber.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleBarberStatus = async (id: string, currentStatus: string) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await fetch(`${API_URL}/api/barbers/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status} ${response.statusText}`);
      }

      setBarbers((prevBarbers) =>
        prevBarbers.map((barber) =>
          barber.id === id ? { ...barber, status: newStatus } : barber
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetchStatus = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/barbers/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Erro ao buscar status do barbeiro: ${response.status} ${response.statusText}`);
      }
      const updatedBarber: Barber = await response.json();
      setBarbers((prevBarbers) =>
        prevBarbers.map((barber) =>
          barber.id === id ? { ...barber, status: updatedBarber.status } : barber
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <BarbersContext.Provider
      value={{
        barbers,
        loading,
        error,
        addBarber,
        deleteBarber,
        toggleBarberStatus,
        refetch: fetchBarbers,
        refetchStatus,
      }}
    >
      {children}
    </BarbersContext.Provider>
  );
};

export const useBarbersContext = () => {
  const context = useContext(BarbersContext);
  if (!context) {
    throw new Error("useBarbersContext deve ser usado dentro de um BarbersProvider");
  }
  return context;
};