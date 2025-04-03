"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

export const JoinTheQueue = () => {

  const{user} = useAuth()

  return (
    <div className="flex justify-center items-center h-screen">
      <Button className="bg-red-600">Sair</Button>
    </div>
  );
};