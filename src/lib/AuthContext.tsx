'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "./utils"

interface User {
    id: string
    name: string
    phone: string
    email?: string | null
    role: string
}

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    loading: boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${API_URL}/api/auth/me`, {
                    credentials: 'include'
                })

                if(response.ok) {
                    const userData = await response.json()
                    setUser(userData)
                } else {
                    setUser(null)
                }
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const logout = async () => {
        setLoading(true)
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })
            setUser(null)
            router.push(`${API_URL}/auth/login`)
        } catch (error) {
            console.error("Erro ao fazer logout", error)
        } finally {
            setLoading(false)
        }
    }
    return(
        <AuthContext.Provider value={{user, setUser, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if(context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}