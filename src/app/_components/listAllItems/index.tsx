import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { Spinner } from '../spinner';
import { useItemsContext } from '@/lib/context/ItemsContext';

export const ListAllItems = () => {
  const { items, loading, deleteItem } = useItemsContext();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = items.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateToBR = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <main className="relative bg-zinc-800 rounded-lg p-4 flex flex-col gap-2 w-full overflow-auto custom-scrollbar">
      <div className="w-full mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar item por nome..."
          className="bg-zinc-700 text-white border-zinc-600 focus:border-zinc-500"
        />
      </div>

      <header className="w-full flex justify-between mb-4">
        <span className="text-xs text-zinc-500/90 min-w-[30%]">Nome</span>
        <span className="text-xs text-zinc-500/90">Valor</span>
        <span className="text-xs text-zinc-500/90">Estoque</span>
        <span className="text-xs text-zinc-500/90">Remover</span>
      </header>

      {loading ? (
        <Spinner className="absolute top-1/2 left-1/2" />
      ) : filteredItems.length === 0 ? (
        <p className="text-zinc-500 text-center">Nenhum item encontrado</p>
      ) : (
        filteredItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center justify-between border-b border-zinc-500/50 pb-2"
          >
            <span className="text-md min-w-[30%]">{item.item}</span>
            <span className='text-green-600 font-semibold'>R$ {item.value.toFixed(2)}</span>
            <span>{item.qtd}</span>
            <Button
              onClick={() => deleteItem(item.id)}
              className="bg-red-600 cursor-pointer ease-in-out hover:bg-red-600/70"
              aria-label={`Remover ${item.item}`}
            >
              <XIcon />
            </Button>
          </div>
        ))
      )}
    </main>
  );
};