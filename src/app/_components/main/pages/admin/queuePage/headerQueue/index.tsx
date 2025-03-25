import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/utils";
import { useState } from "react"

export const HeaderQueuePage = ({selected, setSelected}: {selected: string, setSelected: (val: string) => void}) =>{


    return(
        <header
        className="max-h-10 flex items-center shadow-lg lg:gap-4 gap-2"
        >
            <ButtonQueue name="Filas" selected={selected} setSelected={setSelected} typed="queues"/>
            <ButtonQueue name="Add +" selected={selected} setSelected={setSelected} typed="add"/>
            <ButtonQueue name="Serviços" selected={selected} setSelected={setSelected} typed="services"/>
            <ButtonQueue name="Barbeiros" selected={selected} setSelected={setSelected} typed="barbers"/>


        </header>
    )
}

const ButtonQueue = ({setSelected, selected, typed, name, qtd}: {setSelected: (val: string) => void, selected: string, typed: string, name: string, qtd?: number | undefined}) => {
    return(

        <div className="relative">
            {qtd === 0 || qtd === undefined ? "" : 
            <span className="text-xs w-6 h-6 absolute -right-2 -top-3 rounded-full bg-red-600 flex items-center justify-center">{qtd}</span>
            }

            <Button
            onClick={() => setSelected(typed)}
            className={`p-2 px-4 rounded ${selected === typed ? "bg-blue-600 hover:bg-blue-600/80" : "bg-zinc-700 hover:bg-zinc-700/80</header>"} duration-200 ease-in-out cursor-pointer`}
            >
                {name}
            </Button>
        </div>
    )
}