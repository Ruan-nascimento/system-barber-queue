"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { API_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(`${API_URL}/main/${user.id}`);
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
        <p className="text-2xl font-bold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="h-dvh w-screen flex flex-col items-center justify-center bg-zinc-900 text-zinc-200">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Barber App!</h1>
      <p className="text-lg">Faça login ou registre-se para começar.</p>

      <Button
        onClick={e => router.push(`${API_URL}/auth/login`)}
        className="w-full min-w-[300px] max-w-md bg-zinc-700 mt-6 duration-200 ease-in-out hover:bg-zinc-600 active:bg-zinc-500 cursor-pointer"
        >Login</Button>

      <Button
        onClick={e => router.push(`${API_URL}/auth/register`)}
        className="w-full min-w-[300px] max-w-md bg-zinc-700 mt-6 duration-200 ease-in-out hover:bg-zinc-600 active:bg-zinc-500 cursor-pointer"
        >Registro</Button>
    </div>
  );
}