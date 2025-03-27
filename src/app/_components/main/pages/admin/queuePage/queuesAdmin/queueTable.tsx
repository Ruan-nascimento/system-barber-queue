// components/admin/QueueTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check } from "lucide-react";
import { API_URL } from "@/lib/utils";
import { QueueProps } from ".";
import { useEffect } from "react";

export function QueueTable({ data, onUpdate }: QueueProps & { onUpdate: () => void }) {
  const handleMoveDown = async (queueId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/queues/move-down`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queueId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao mover para baixo");
      }

      onUpdate();
    } catch (error) {
      console.error("Erro ao mover para baixo:", error);
    }
  };

  const handleComplete = async (queueId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/queues/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queueId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao concluir");
      }

      onUpdate();
    } catch (error) {
      console.error("Erro ao concluir:", error);
    }
  };

  const handleRemove = async (queueId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/queues/recuse`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queueId }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao marcar como concluído");
      }

      onUpdate();
    } catch (error) {
      console.error("Erro ao marcar como concluído:", error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-950">
            <TableHead className="w-[50px]">P</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Serviços</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>
              <ArrowDown className="h-4 w-4" />
            </TableHead>
            <TableHead className="w-[50px]">
              <Check className="h-4 w-4" />
            </TableHead>
            <TableHead className="w-[50px]">x</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Fila vazia
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.position}º</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.services.map((s) => s.service).join(", ")}</TableCell>
                <TableCell className="text-green-500 font-semibold">
                  R$ {item.services.reduce((sum, s) => sum + s.value, 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  {item.status === "waiting" && (
                    <Button
                      variant="outline"
                      size="sm"
                      title="Mover para o final"
                      className="bg-red-500 duration-200 ease-in-out cursor-pointer hover:bg-red-600 active:bg-red-700/50"
                      onClick={() => handleMoveDown(item.id)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {item.status === "waiting" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="isWaiting"
                      className="bg-green-500 ease-in-out duration-200 cursor-pointer hover:bg-green-600 active:bg-green-700/50"
                      onClick={() => handleComplete(item.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="ghost"
                      size="sm"
                      title="completed"
                      className="bg-zinc-700 ease-in-out duration-200 cursor-pointer hover:bg-zinc-800/50"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {item.status === "waiting" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Marcar como concluído"
                      className="bg-red-500 ease-in-out duration-200 cursor-pointer hover:bg-red-600 active:bg-red-700/50"
                      onClick={() => handleRemove(item.id)}
                    >
                      X
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}