"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { API_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type UserSelected = "dashboard" | "history" | "queue"

export default function MainPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (!loading && !user) {
      router.push(`${API_URL}/auth/login`)
    } 

    if (user?.role === 'client') {
      router.push(`${API_URL}/client/${user.id}`)
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
        <p className="text-2xl font-bold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="relative h-dvh w-screen flex flex-col lg:flex-row items-center justify-start bg-zinc-900 text-zinc-200">
    

      barbearia
      <Button onClick={logout} className="bg-red-600 ml-10">Logout</Button>

    </div>
  )
}