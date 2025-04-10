import { Button } from "@/components/ui/button"
import { CogIcon } from "lucide-react"
import { useState } from "react"
import { FindAllUsers } from "../../findAllUsers"
import { CreateNewClient } from "../../createNewClient"

type UserPage = "add" | "new"

export const ClientsAdmin = () => {

    const [userPage, setUserPage] = useState<UserPage>('add')

    return(
        <section 
        className="w-full h-full overflow-clip px-6 p-2"
        >
            <header
            className="flex flex-col gap-6"
            >
                <h1
                className="flex gap-4 text-3xl font-bold items-center"
                ><CogIcon size={44} className="text-orange-500"/> Gerenciamento de Usuários</h1>

                <nav>
                    <Button
                    onClick={() => setUserPage('add')}
                    className={`border-b rounded-none cursor-pointer transition-colors duration-200 ${userPage === 'add' ? 'border-orange-500' : 'border-transparent'}`}
                    >Adicionar à Fila</Button>
                    <Button
                    onClick={() => setUserPage('new')}
                    className={`border-b rounded-none cursor-pointer transition-colors duration-200 ${userPage === 'new' ? 'border-orange-500' : 'border-transparent'}`}
                    >Criar Novo Cliente</Button>
                </nav>
            </header>

            <main
            className="h-full w-full mt-2"
            >
                {userPage === 'add' && <FindAllUsers/>}
                {userPage === 'new' && <CreateNewClient/>}
            </main>

        </section>
    )
}