"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion"
import { Spinner } from "@/app/_components/spinner";
import { NavBarMainPage } from "@/app/_components/main/navigationBar";
import { API_URL } from "@/lib/utils";
import { HeaderMainPageMobile } from "@/app/_components/main/header";
import { QueueAdmin } from "@/app/_components/layouts/queueAdmin";
import { SettingsAdmin } from "@/app/_components/layouts/settings";

export type PageSelected = "dashboard" | "history" | "queue" | "settings"

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
    
    <div className="relative h-dvh w-screen flex flex-col lg:flex-row items-center justify-start bg-[#0a0a0a] text-white">


      <AnimatePresence>
        {openSide && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[50%] min-w-[200px] shadow-lg z-50 lg:hidden"
            >
              <NavBarMainPage setPage={setPage} page={page} className="absolute top-0 left-0"/>
            </motion.div>


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

        {/* Header apenas no mobile */}
      <HeaderMainPageMobile openSide={openSide} setOpenSide={setOpenSide}/>

      <NavBarMainPage 
      setPage={setPage} 
      page={page}
      className="hidden lg:w-[20%] lg:flex lg:max-w-[300px] lg:shadow-md"
      />

      

      {/* Paginação - troca de páginas */}
      <main
      className="pt-20 pb-10 lg:pt-6 w-full h-full"
      >
        {page === 'queue' && <QueueAdmin/>}

        {page === 'settings' && <SettingsAdmin/>}
      </main>

    </div>
  )
}