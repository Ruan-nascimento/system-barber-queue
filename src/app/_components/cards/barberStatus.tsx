import { Button } from "@/components/ui/button"
import { Card } from "."
import { Spinner } from "../spinner"

interface BarberStatusProps {
    status: boolean
    isUpdatingStatus: boolean
    updateBarberShopStatus: (val:boolean) => void
}

export const BarberStatus = ({status, updateBarberShopStatus, isUpdatingStatus}:BarberStatusProps) => {
    return(
        <Card>
            <span className="text-zinc-300/60">Status da Barbearia</span>
                <div className="relative">
                  <span className="text-blue-600 text-xl lg:text-4xl mt-2">
                    {status ? "Aberto" : "Fechado"}
                  </span>
                  <span
                    className={`w-4 h-4 absolute rounded-full right-0 top-[50%] transform -translate-y-1/2 ${
                      status ? "bg-green-700 pulse-glow-green" : "bg-red-700 pulse-glow-red"
                    }`}
                  ></span>
                </div>
                <Button
                  onClick={() => updateBarberShopStatus(!status)}
                  className="bg-blue-600 mt-4 duration-200 ease-in-out hover:bg-blue-600/90 active:bg-blue-600/80 cursor-pointer flex items-center justify-center"
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? (
                    <Spinner />
                  ) : (
                    <>{status ? "Fechar.." : "Abrir..."}.</>
                  )}
                </Button>
          </Card>
    )
}