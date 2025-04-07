import { Clock3Icon, RefreshCw } from "lucide-react";
import { BarberSelector } from "../../barberSelector";
import { QueueAdminTable } from "../../queueAdminTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQueue } from "@/lib/hooks/useQueue";
import { useBarbersContext } from "@/lib/context/BarbersContext";

export const QueueAdmin = () => {
  const { barbers } = useBarbersContext();
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const { refetch, loading } = useQueue();

  return (
    <section className="w-full h-full overflow-clip">
      <header className="flex flex-col gap-6 justify-between bg-[#0a0a0a] p-2 lg:p-6 mb-6">
        <div className="flex gap-3 items-center">
          <Clock3Icon className="lg:size-10 size-8 text-orange-500" />
          <h1 className="font-bold lg:text-3xl">Gerenciamento de Fila</h1>
          <Button
            onClick={() => refetch()}
            disabled={loading}
            className="flex items-center justify-center w-10 h-10 duration-200 ease-in-out hover:scale-110 hover:rotate-180 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`text-orange-500 ${loading ? "animate-spin" : ""}`}
              size={30}
            />
          </Button>
        </div>

        <BarberSelector
          barbers={barbers}
          onChange={setSelectedBarber}
          value={selectedBarber}
          placeholder="Barbeiro"
          searchPlaceholder="Pesquisar..."
          className="w-full lg:max-w-[300px]"
        />
      </header>

      <main className="px-2 lg:px-6 pb-6 overflow-auto custom-scrollbar w-full h-full">
        <QueueAdminTable selectedBarber={selectedBarber} />
      </main>
    </section>
  );
};