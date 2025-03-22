"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";

export default function MainPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`${API_URL}/auth/login`);
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
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Bem-vindo, {user.name}!</h1>
          <p className="mb-6">Seu ID: {user.id}</p>
          <Button
            onClick={logout}
            className="bg-red-600 text-zinc-100 hover:bg-red-500 duration-200 ease-in-out cursor-pointer"
          >
            Sair
          </Button>
        </>
      ) : null}
    </div>
  );
}