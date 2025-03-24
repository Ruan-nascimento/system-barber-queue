import { Card } from "."
import { Spinner } from "../spinner"

interface PeoplesInQueueProps {
    queueCount: number
    isLoadingQueue: boolean
}

export const PeoplesInQueue = ({queueCount, isLoadingQueue}: PeoplesInQueueProps) => {
    return (
        <Card>
            <span className="text-zinc-300/60">Pessoas na Fila</span>
            {isLoadingQueue ? (
                <div className="mt-4">
                <Spinner />
                </div>
            ) : (
                <span className="text-4xl lg:text-7xl mt-4 text-blue-600">{queueCount}</span>
            )}
        </Card>
    )
}