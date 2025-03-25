import { Icon } from "@/app/_components/buttonMenuBar/icon"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Barber } from "."

interface DropdownMenuBarbersProps {
    selectedBarber: Barber | null
    loading: boolean
    barbers: Barber[]
    setSelectedBarber: (val: Barber | null) => void
}

export const DropdownMenuBarbers = ({selectedBarber, loading, barbers, setSelectedBarber}: DropdownMenuBarbersProps) => {
    return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-64 cursor-pointer">
              {selectedBarber ? selectedBarber.name : <div className="flex items-center gap-2">Selecione um barbeiro <Icon name="ArrowDown" size={20}/></div>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-zinc-800 text-zinc-200">
            <DropdownMenuLabel className="border-b">Barbeiros</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {loading ? (
              <DropdownMenuItem disabled>Carregando...</DropdownMenuItem>
            ) : barbers.length > 0 ? (
              barbers.map((barber: any) => (
                <DropdownMenuItem
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber)}
                  className="duration-200 ease-in-out hover:bg-zinc-900 cursor-pointer"
                >
                  {barber.name}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>Nenhum barbeiro encontrado</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
    )
}