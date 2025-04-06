import { ButtonEdit } from "@/app/_components/buttonEdit"
import { UserInitialsAvatar } from "@/app/_components/userInitialsAvatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/AuthContext"
import { Edit3Icon } from "lucide-react"

export const ProfileSettingPage = () => {

    const {user} = useAuth()

    return(
        <main className="flex-1 flex flex-col gap-4">
            <header className="flex gap-4 items-center border border-zinc-500/50 p-4 rounded-xl justify-between">

                <div className="flex items-center gap-4">

                    <UserInitialsAvatar name={user?.name} size={100}/>

                    <div className="flex flex-col">
                        <span className="text-xl font-semibold">{user?.name}</span>
                        {user?.email && <span className="text-zinc-400/70">{user?.email}</span>}
                        <span className="text-zinc-400/70">{user?.phone}</span>

                    </div>
                </div>

                <ButtonEdit/>

            </header>

            <div className="flex gap-4 items-center border border-zinc-500/50 p-4 rounded-xl justify-between">

            </div>
        </main>
    )
}