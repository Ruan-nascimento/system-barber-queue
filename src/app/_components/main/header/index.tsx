import { useAuth } from "@/lib/AuthContext"
import { LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import { ButtonAccount } from "../../buttonAccount"

interface HeaderMainPageMobileProps {
    setOpenSide: (val: boolean) => void
    openSide: boolean
}

export const HeaderMainPageMobile = ({setOpenSide, openSide}:HeaderMainPageMobileProps) => {

    return(
        <header className="fixed top-0 w-full h-20 bg-[#020501] border-b-white/30 border-b lg:hidden flex items-center justify-between px-4">

        <button
        onClick={() => setOpenSide(true)}
        className={`${openSide ? 'text-orange-500' : ''}`}
        >
          <MenuIcon size={30}/>
        </button>

        <div className="flex items-center gap-4">
          <Image
          src={'/img/barber_logo.png'}
          alt="Logo da Barbearia"
          width={50}
          height={50}
          />
          <span className="font-bold underline underline-offset-4 ">Barbearia WE</span>
        </div>

        <ButtonAccount/>
      
      </header>
    )
}