import { Button } from "@/components/ui/button"
import { HTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface RootProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    className?: string
    type?: 'submit' | 'button' | 'reset'
}

export const Root = ({children, type='button', ...rest}:RootProps) => {
    return(
        <Button
        {...rest}
        type={type}
        className={twMerge(`w-full bg-orange-500 text-zinc-100 hover:bg-orange-500/80 duration-200 ease-in-out cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed`, rest.className)}
        >
            {children}
        </Button>
    )
}