"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { MenuBarMobile } from "@/app/_components/main/menuBar";
import { DashboardPage } from "@/app/_components/main/pages/admin/dashboardPage";
import { QueuePage } from "@/app/_components/main/pages/admin/queuePage";
import { HistoryPage } from "@/app/_components/main/pages/admin/historyPage";

export type UserSelected = "dashboard" | "history" | "queue"

export default function MainPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<UserSelected>('dashboard')

  useEffect(() => {
    if (!loading && !user) {
      router.push(`${API_URL}/auth/login`)
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
    <div className="relative h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
      
      <Button 
      disabled={openMenu}
      onClick={() => setOpenMenu(true)} className=" bg-amber-400 cursor-pointer absolute left-2 top-2">
        Abra Aqui
      </Button>
      
      {
        menuSelected === "dashboard" && (
          <DashboardPage/>
        )
      }

      {
        menuSelected === "queue" && (
          <QueuePage/>
        )
      }

      {
        menuSelected === "history" && (
          <HistoryPage/>
        )
      }

      <MenuBarMobile openMenu={openMenu} setOpenMenu={setOpenMenu} menuSelected={menuSelected} setMenuSelected={setMenuSelected}/>

    </div>
  );
}