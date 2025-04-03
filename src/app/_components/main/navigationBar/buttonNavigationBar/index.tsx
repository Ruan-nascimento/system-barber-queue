import { PageSelected } from "@/app/(pages)/main/[id]/page"
import { HTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonNavigationBarProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    page: PageSelected
    ord: PageSelected
}

export const ButtonNavigationBar = ({ord, page, children, ...rest}:ButtonNavigationBarProps) => {
    return(
        <button
        {...rest}
            className={twMerge(`font-semibold flex items-center pl-2 gap-4 rounded-md w-full h-10 duration-200 ease-in-out hover:bg-orange-500/70 hover:text-zinc-200 cursor-pointer p-6 ${ord === page ? 'bg-orange-500 text-zinc-200' : 'text-zinc-600'}`, rest.className)}
            >   
            {children}
        </button>
    )
}