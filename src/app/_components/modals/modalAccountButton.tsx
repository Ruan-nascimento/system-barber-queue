import { useAuth } from "@/lib/AuthContext"
import { LogOutIcon, UserCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { Spinner } from "../spinner"

interface ModalAccountButtonProps {
    setOpenModalAccount: (val:boolean) => void
    openModalAccount: boolean
}

export const ModalAccountButton = ({setOpenModalAccount, openModalAccount}:ModalAccountButtonProps) => {

    const modalRef = useRef<HTMLDivElement>(null)
    const {logout, loading} = useAuth()

    useEffect(() => {
        const handleClickOutside = (e:MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setOpenModalAccount(false)
            }
        }

        if (openModalAccount) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openModalAccount, setOpenModalAccount])

    return (
        <div
        ref={modalRef}
        className="absolute z-50 lg:-top-[310%] top-16 right-4 lg:w-full lg:left-0 w-[200px] rounded-lg border-white border bg-zinc-950 p-4 flex flex-col gap-3"
        >
            <button 
            className="flex items-center gap-6 px-4 py-3 justify-center cursor-pointer bg-zinc-800/70 rounded-2xl duration-200 ease-in-out hover:bg-zinc-600">
                Perfil
                <UserCircle2/>
            </button>

            <button 
            onClick={() => logout()}
            className="flex items-center gap-6 px-4 py-3 justify-center cursor-pointer bg-zinc-800/70 rounded-2xl duration-200 ease-in-out hover:bg-red-600">
                {
                    loading ? <Spinner className="absolute"/> :
                    <span className="flex gap-6">
                        Sair
                        <LogOutIcon/>
                    </span>

                }
            </button>

        </div>
    )
}