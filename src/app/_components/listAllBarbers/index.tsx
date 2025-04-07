import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Spinner } from "../spinner";
import { ToggleButton } from "../toggleButton";
import { useBarbersContext } from "@/lib/context/BarbersContext";

export const ListAllBarbers = () => {
  const { barbers, loading, deleteBarber, toggleBarberStatus } = useBarbersContext();

  return (
    <main
      className="relative bg-zinc-800 rounded-lg p-4 flex flex-col gap-2 w-full overflow-auto custom-scrollbar"
    >
      <header className="w-full flex justify-between mb-4">
        <span className="w-6"></span>
        <span className="text-xs text-zinc-500/90 min-w-[30%]">Nome</span>
        <span className="text-xs text-zinc-500/90">Data de Entrada</span>
        <span className="text-xs text-zinc-500/90 max-w-4">Status</span>
        <span className="text-xs text-zinc-500/90">Remover</span>
      </header>

      {loading ? (
        <Spinner className="absolute top-1/2 left-1/2" />
      ) : (
        barbers.map((barber) => {
          const formatDateToBR = (date: Date | string) => {
            const dateObj = typeof date === "string" ? new Date(date) : date;

            if (isNaN(dateObj.getTime())) {
              return "";
            }

            return dateObj.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          };

          return (
            <div
              key={barber.id}
              className="w-full flex items-center justify-between border-b border-zinc-500/50 pb-2"
            >
              <ToggleButton
                id={barber.id}
                active={barber.status === "active"}
                onToggle={() => toggleBarberStatus(barber.id, barber.status)}
              />
              <span className="text-md min-w-[30%]">{barber.name}</span>
              <span>{formatDateToBR(barber.createdAt)}</span>
              {barber.status === "active" ? (
                <span className="w-2 h-2 rounded-full animate-pulse-glow-green bg-green-500"></span>
              ) : (
                <span className="w-2 h-2 rounded-full animate-pulse-glow-red bg-red-500"></span>
              )}
              <Button
                onClick={() => deleteBarber(barber.id)}
                className="bg-red-600 cursor-pointer ease-in-out hover:bg-red-600/70"
                aria-label={`Remover ${barber.name}`}
              >
                <XIcon />
              </Button>
            </div>
          );
        })
      )}
    </main>
  );
};