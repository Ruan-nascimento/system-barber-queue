'use client'

import { JoinTheQueue } from "@/app/_components/main/pages/client/JoinTheQueue";
import { useAuth } from "@/lib/AuthContext";
import { API_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ClientMainPage() {
    const{logout, loading, user}=useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push(`${API_URL}/auth/login`);
            logout
        }
      }, [loading, user, router, logout]);


    return(
        <div className="w-screen h-dvh bg-zinc-800 text-zinc-200">
            <div className="w-full h-full flex bg-zinc-900 justify-around items-center">
            <JoinTheQueue/>
            <button onClick={logout} className="w-32 h-10 bg-red-600">
                Sair
            </button>
            </div>
        </div>
    )
}