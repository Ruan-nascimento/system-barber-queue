import { Spinner } from "@/app/_components/spinner"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/AuthContext"

export const HistoryPage = () => {
    const {logout, loading} = useAuth()
    return (
        <div>
        {loading ? <Spinner/> :
        <Button variant={"destructive"} className="bg-red-700 ml-10" onClick={logout}>
        Sair
        </Button>}
        </div>
    )
}