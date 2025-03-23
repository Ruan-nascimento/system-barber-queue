import { ReactNode } from "react"

export const Card = ({children}: {children:ReactNode}) => {
    return(
        <div className="relative flex flex-col gap-2 h-44 w-full bg-zinc-700 rounded-sm shadow-sm duration-200 ease-in-out hover:bg-zinc-700/80 hover:scale-105
        p-4">
            {children}
        </div>
    )
}