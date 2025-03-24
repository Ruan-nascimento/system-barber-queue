import { Card } from "."
import { Spinner } from "../spinner"

interface TotalValueProps {
    isLoadingSales: boolean
    totalSales: number
    formatCurrency: (val: number) => string
}

export const TotalValue = ({isLoadingSales, totalSales, formatCurrency}: TotalValueProps) => {
    return(
        <Card>
            <span className="text-zinc-300/60">Suas Vendas</span>
            {isLoadingSales ? (
                <div className="mt-4">
                <Spinner />
                </div>
            ) : (
                <>
                <span className="text-2xl lg:text-4xl mt-4 text-blue-600">
                    {formatCurrency(totalSales)}
                </span>
                <span className="text-xs opacity-55 mt-6">
                    Valor apenas de Serviços Confirmados...
                </span>
                </>
            )}
            </Card>
    )
}