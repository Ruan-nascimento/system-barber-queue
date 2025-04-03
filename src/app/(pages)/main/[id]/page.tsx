"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion"
import { Spinner } from "@/app/_components/spinner";
import { QueueAdminPage } from "@/app/_components/main/Main-pages/queue";
import { NavBarMainPage } from "@/app/_components/main/navigationBar";
import { API_URL } from "@/lib/utils";
import { LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";

export type PageSelected = "dashboard" | "history" | "queue"

export default function MainPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [page, setPage] = useState<PageSelected>("queue")
  const [openSide, setOpenSide] = useState<boolean>(false)


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
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200 flex-col gap-10">
        <p className="text-2xl font-bold">Carregando...</p>
        <Spinner/>
      </div>
    );
  }

  return (
    <div className="relative h-dvh w-screen flex flex-col lg:flex-row items-center justify-start bg-zinc-900 text-zinc-200">
      
      {/* Barra de Navegação...Mobile */}

      <AnimatePresence>
        {openSide && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[50%] min-w-[200px] max-w-[350px] shadow-lg z-50 lg:hidden"
            >
              <NavBarMainPage setPage={setPage} page={page} />
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black/60 z-40 lg:hidden"
              onClick={() => setOpenSide(false)}
            />
          </>
        )}
      </AnimatePresence>

      <header className="fixed top-0 w-full h-20 bg-zinc-800/60 border-b-orange-500 border-b lg:hidden flex items-center justify-between px-6">

        <button
        onClick={() => setOpenSide(true)}
        className={`${openSide ? 'text-orange-500' : ''}`}
        >
          <MenuIcon size={30}/>
        </button>

        <div className="flex items-center gap-4">
          <Image
          src={'/img/barber_logo.png'}
          alt="Logo da Barbearia"
          width={50}
          height={50}
          />
          <span className="font-bold underline underline-offset-4 ">Barbearia WE</span>
        </div>

        <button
        onClick={logout}
        className="duration-200 ease-in-out active:text-red-600"
        >
          <LogOutIcon size={30}/>
        </button>
      
      </header>

      

      {/* Paginação - troca de páginas */}
      {page === "queue" && <QueueAdminPage/>}

    </div>
  )
}