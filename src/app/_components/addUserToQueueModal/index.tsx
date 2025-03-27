"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/utils";
import { toast } from "sonner";

interface AddUserToQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; phone: string } | null;
  onConfirm: () => void;
}

export const AddUserToQueueModal = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}: AddUserToQueueModalProps) => {
  const [services, setServices] = useState<
    { id: number; service: string; value: number; lengthService: number }[]
  >([]);
  const [barbers, setBarbers] = useState<{ id: number; name: string }[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (!response.ok) throw new Error("Erro ao buscar serviços");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBarbers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/barbers`);
      if (!response.ok) throw new Error("Erro ao buscar barbeiros");
      const data = await response.json();
      setBarbers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchServices();
      fetchBarbers();
    }
  }, [isOpen]);

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalValue = services
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.value, 0);

  const estimatedTime = services
    .filter((service) => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.lengthService, 0);

  const handleAddToQueue = async () => {
    if (selectedServices.length === 0 || !selectedBarber || !user) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/queues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          barberId: selectedBarber,
          serviceIds: selectedServices,
          estimatedTime,
        }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar à fila");

      toast.success(`${user.name} adicionado à fila com sucesso!`, {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        },
      });

      setLoading(false);
      onConfirm();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Erro ao adicionar à fila", {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        },
      });
    }
  };

  if (!isOpen || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border-zinc-700">
        <DialogHeader>
          <DialogTitle>Adicionar {user.name} à Fila</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Escolha um Barbeiro</h3>
            <RadioGroup
              value={selectedBarber?.toString() || ""}
              onValueChange={(value) => setSelectedBarber(Number(value))}
              className="space-y-2"
            >
              {barbers.map((barber) => (
                <div key={barber.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={barber.id.toString()} id={`barber-${barber.id}`} />
                  <Label htmlFor={`barber-${barber.id}`}>{barber.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Escolha os Serviços</h3>
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <Label htmlFor={`service-${service.id}`}>{service.service}</Label>
                </div>
                <span>R$ {service.value.toFixed(2)} ({service.lengthService} min)</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div>
              <strong>Total: R$ {totalValue.toFixed(2)}</strong>
            </div>
            <div>
              <strong>Tempo Estimado: {estimatedTime} minutos</strong>
            </div>
          </div>
          <Button
            onClick={handleAddToQueue}
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={selectedServices.length === 0 || !selectedBarber || loading}
          >
            {loading ? "Adicionando..." : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};