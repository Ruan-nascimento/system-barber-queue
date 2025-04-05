
import { PageSelected } from "@/app/(pages)/main/[id]/page"
import { ButtonNavigationBar } from "./buttonNavigationBar"
import { CalendarClock, Clock, Home, PanelBottom } from "lucide-react"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
import { ButtonAccount } from "../../buttonAccount"
import { useQueue } from "@/lib/hooks/useQueue"

interface NavBarMainPageProps {
    page: PageSelected
    setPage: (val: PageSelected) => void
    className?: string
}

export const NavBarMainPage = ({page, setPage, ...rest}:NavBarMainPageProps) => {

    const {queueEntries} = useQueue()

    return(
        <nav
        className={twMerge(`flex items-center justify-between flex-col min-w-[300px] gap-4 w-full bg-[#020501] border-r-white/30 border-r py-6 h-full px-6`, rest.className)}
        >   
            <div className="w-full flex items-center flex-col gap-4">
                <Image
                src={'/img/barber_logo.png'}
                alt="Logo da Barbearia"
                width={100}
                height={100}
                className="mb-10"
                />


                <ButtonNavigationBar ord="dashboard" page={page}
                onClick={() => setPage('dashboard')}
                >
                    <PanelBottom/>
                    Painel
                </ButtonNavigationBar>

                <ButtonNavigationBar ord="queue" page={page} notify={queueEntries.length}
                onClick={() => setPage("queue")}
                >
                    <Clock/>
                    Fila
                </ButtonNavigationBar>

                <ButtonNavigationBar ord="history" page={page}
                onClick={() => setPage('history')}
                >
                    <CalendarClock/>
                    Histórico
                </ButtonNavigationBar>
            </div>



            <ButtonAccount className="hidden lg:w-full lg:flex"/>
            

        </nav>
    )
}