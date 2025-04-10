import { ChevronRight, ListCollapse, ScissorsIcon, SettingsIcon, Trash2Icon, UserCircle2Icon } from "lucide-react"
import { ButtonNavigationBar } from "../../main/navigationBar/buttonNavigationBar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ButtonConfig } from "../../buttonConfig"
import { ProfileSettingPage } from "./profile"
import { ServicesSettingsPage } from "./services"
import { BarbersSettingPage } from "./barbers"
import { ProductsSettingPage } from "./products"
import { ItemsProvider } from "@/lib/context/ItemsContext"

export type settings = "profile" | "services" | "barbers" | "items"

export const SettingsAdmin = () => {

    const [selected, setSelected] = useState<settings>('profile')

    return (
        <section
        className="w-full h-full overflow-clip px-6 p-2"
        >
            
            <h1 className="text-3xl font-bold mb-6 flex gap-4 items-center"><SettingsIcon size={40} className="text-orange-500"/> Configurações da Conta</h1>

            <main className="w-full flex gap-4 h-full pb-6">
                <aside className="w-[20%] max-h-[300px] max-w-[300px] min-w-[250px] bg-zinc-900 p-6 rounded-lg flex flex-col gap-4">
                    <ButtonConfig prop="profile" selected={selected} setSelected={setSelected}>
                        <UserCircle2Icon className={`${selected === 'profile' ? 'text-orange-500' : ''}`}/>
                        Meu Perfil
                    </ButtonConfig>

                    <ButtonConfig prop="services" selected={selected} setSelected={setSelected}>
                        <ListCollapse className={`${selected === 'services' ? 'text-orange-500' : ''}`}/>
                        Serviços
                    </ButtonConfig>

                    <ButtonConfig prop="barbers" selected={selected} setSelected={setSelected}>
                        <ScissorsIcon className={`${selected === 'barbers' ? 'text-orange-500' : ''}`}/>
                        Barbeiros
                    </ButtonConfig>

                    <ButtonConfig prop="items" selected={selected} setSelected={setSelected}>
                        <UserCircle2Icon className={`${selected === 'items' ? 'text-orange-500' : ''}`}/>
                        Produtos
                    </ButtonConfig>

                </aside>
                <ItemsProvider>
                {selected === 'profile' && <ProfileSettingPage/>}
                {selected === 'services' && <ServicesSettingsPage/>}
                {selected === 'barbers' && <BarbersSettingPage/>}
                {selected === 'items' && <ProductsSettingPage/>}
                </ItemsProvider>
            </main>

        </section>
    )
}