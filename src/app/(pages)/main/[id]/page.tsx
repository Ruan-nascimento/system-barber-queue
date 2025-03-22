"use client";

import { useAuth } from "@/lib/AuthContext";

export default function MainPage() {
  const { user } = useAuth();

  return (
    <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
      {user ? (
        <h1>Bem-vindo, {user.name}!</h1>
      ) : (
        <h1>Nenhum usuário logado</h1>
      )}
    </div>
  );
}