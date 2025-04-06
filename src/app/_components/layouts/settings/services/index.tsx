import { AddNewServices } from "@/app/_components/addNewServices"
import { ListAllServices } from "@/app/_components/listAllServices"
import { Button } from "@/components/ui/button"
import { ServicesProvider } from "@/lib/context/servicesContext"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

export const ServicesSettingsPage = () => {
    const [findService, setFindService] = useState<string>('')

    const handleChangeFindInput = (e: any) => {
        e.preventDefault()
        setFindService(e.target.value)
    }

    return (
        <ServicesProvider>
            <main className="flex-1 bg-zinc-900/70 p-4 rounded-lg h-full">
                <header className="h-10 relative mb-10">
                    <input 
                        value={findService}
                        onChange={(e: any) => handleChangeFindInput(e)}
                        className="bg-zinc-800 pl-10 w-full outline-none border border-transparent px-4 py-2 rounded-2xl duration-200 ease-in-out hover:bg-zinc-800/80 focus:bg-zinc-900 focus:border-zinc-300/50"
                        placeholder="Procure os serviços..."
                    />
                    <Button
                        className="absolute h-full right-0 p-4 bg-orange-500 rounded-r-2xl"
                    >
                        <SearchIcon/>
                    </Button>
                </header>

                <div className="flex gap-4">
                    <AddNewServices/>
                    <ListAllServices findService={findService} />
                </div>
            </main>
        </ServicesProvider>
    )
}