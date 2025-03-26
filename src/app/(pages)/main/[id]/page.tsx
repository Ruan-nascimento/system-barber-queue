"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { API_URL, handleScrollToTop } from "@/lib/utils";
import { MenuBarMobile } from "@/app/_components/main/menuBar";
import { DashboardPage } from "@/app/_components/main/pages/admin/dashboardPage";
import { QueuePage } from "@/app/_components/main/pages/admin/queuePage";
import { HistoryPage } from "@/app/_components/main/pages/admin/historyPage";
import { MenuBarDesktop } from "@/app/_components/main/menuBarDesktop";
import { Icon } from "@/app/_components/buttonMenuBar/icon";

export type UserSelected = "dashboard" | "history" | "queue"

export default function MainPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [menuSelected, setMenuSelected] = useState<UserSelected>('dashboard')

  useEffect(() => {
    if (!loading && !user) {
      router.push(`${API_URL}/auth/login`)
    } 

    if (user?.role === 'client') {
      router.push(`${API_URL}/client/${user.id}`)
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
    <div className="relative h-dvh w-screen flex flex-col lg:flex-row items-center justify-start bg-zinc-900 text-zinc-200">
    

      <MenuBarDesktop menuSelected={menuSelected} setMenuSelected={setMenuSelected}/>

      <div className="flex flex-col w-full h-full">

      <header className="fixed w-full h-20 shadow lg:hidden flex  justify-between px-6 items-center ">
        <Icon name="MenuIcon" size={32} className="duration-200 ease-in-out hover:bg-blue-700 cursor-pointer"
        onClick={()=> setOpenMenu(true)}
        />

        <span
        className="font-bold text-2xl cursor-pointer"
        ><b className="text-blue-700 underline underline-offset-8">WE</b> Barbearia</span>

        <Icon name="LogOutIcon" size={32} className="cursor-pointer p-2 rounded-full duration-200 hover:bg-red-700"
        onClick={logout}
        />
      </header>
      
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

      </div>

      <MenuBarMobile openMenu={openMenu} setOpenMenu={setOpenMenu} menuSelected={menuSelected} setMenuSelected={setMenuSelected}/>
      

    </div>
  );
}