import { useBarbers } from "@/lib/hooks/useBarbers";
import { Clock3Icon } from "lucide-react";
import { BarberSelector } from "../../barberSelector";
import { useState } from "react";
import { QueueAdminTable } from "../../queueAdminTable";


export const QueueAdmin = () => {
  const { barbers } = useBarbers();
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  return (
    <section className="w-full h-full overflow-clip">

      <header className="flex flex-col gap-6 justify-between bg-[#0a0a0a] p-2 lg:p-6 mb-6">
        <div className="flex gap-3 items-center">
          <Clock3Icon className="lg:size-10 size-8 text-orange-500" />
          <h1 className="font-bold lg:text-3xl">Gerenciamento de Fila</h1>
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
        <QueueAdminTable selectedBarber={selectedBarber}/>
      </main>
    </section>
  );
};