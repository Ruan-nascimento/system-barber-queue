import { useState } from "react"
import { API_URL } from "@/lib/utils"

export const useCancelQueue = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const cancelQueue = async (queueId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_URL}/api/queue/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queueId }),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao cancelar usuário")
      }

      return await response.json()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { cancelQueue, loading, error }
}