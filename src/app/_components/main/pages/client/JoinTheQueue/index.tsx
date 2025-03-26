"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";
import { API_URL } from "@/lib/utils";

export const JoinTheQueue = () => {
  const [services, setServices] = useState<
    { id: number; service: string; value: number; lengthService: number }[]
  >([]);
  const [barbers, setBarbers] = useState<{ id: number; name: string }[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

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
    fetchServices();
    fetchBarbers();
  }, []);

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
    if (selectedServices.length === 0 || !selectedBarber) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/queues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          barberId: selectedBarber,
          serviceIds: selectedServices,
          estimatedTime,
        }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar à fila");
      setIsModalOpen(false);
      setSelectedServices([]);
      setSelectedBarber(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="rounded bg-green-500 duration-200 ease-in-out hover:bg-green-600 active:bg-green-700/50 cursor-pointer text-white px-6 py-3"
          >
            Adicionar à Fila
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white border-zinc-700">
          <DialogHeader>
            <DialogTitle>Selecionar Serviços e Barbeiro</DialogTitle>
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
    </div>
  );
};