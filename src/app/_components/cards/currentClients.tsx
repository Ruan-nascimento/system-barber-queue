import { Card } from "."
import { Spinner } from "../spinner"

interface CurrentClientsProps {
    isLoadingClients: boolean
    clientCount: number
}

export const CurrentClients = ({isLoadingClients, clientCount}:CurrentClientsProps) => {
    return(
        <Card>
            <span className="text-zinc-300/60">Clientes Ativos</span>
            {isLoadingClients ? (
              <div className="mt-4">
                <Spinner />
              </div>
            ) : (
              <span className="text-4xl lg:text-7xl mt-4 text-blue-600">{clientCount}</span>
            )}
          </Card>
    )
}