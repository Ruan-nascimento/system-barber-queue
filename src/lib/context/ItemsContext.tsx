import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../utils';

interface Item {
  id: string;
  item: string;
  value: number;
  qtd: number;
  createdAt: string;
  updatedAt: string;
}

interface ItemsContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  addItem: (item: string, value: number, stockQuantity: number) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/items`);
      if (!response.ok) throw new Error('Erro ao carregar itens');
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar itens');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: string, value: number, qtd: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, value, qtd }),
      });
      if (!response.ok) throw new Error('Erro ao adicionar item');
      const newItem = await response.json();
      setItems((prev) => [...prev, newItem]);
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar item');
      setItems((prev) => prev.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      setError('Erro ao deletar item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{ items, loading, error, addItem, deleteItem, refetch: fetchItems }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItemsContext deve ser usado dentro de um ItemsProvider');
  }
  return context;
};