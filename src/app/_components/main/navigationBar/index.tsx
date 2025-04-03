
import { PageSelected } from "@/app/(pages)/main/[id]/page"
import { ButtonNavigationBar } from "./buttonNavigationBar"
import { Clock, Home } from "lucide-react"

interface NavBarMainPageProps {
    page: PageSelected
    setPage: (val: PageSelected) => void
}

export const NavBarMainPage = ({page, setPage}:NavBarMainPageProps) => {
    return(
        <nav
        className="flex flex-col min-w-[200px] gap-4 absolute top-0 left-0 w-full bg-zinc-950/60 border-r-orange-500 border-r py-6 h-full px-2 "
        >   

            <ButtonNavigationBar ord="queue" page={page}
            onClick={() => setPage("queue")}
            >
                <Clock/>
                Queue
            </ButtonNavigationBar>

            <ButtonNavigationBar ord="dashboard" page={page}
            onClick={() => setPage('dashboard')}
            >
                <Home/>
                Dashboard
            </ButtonNavigationBar>
            

        </nav>
    )
}