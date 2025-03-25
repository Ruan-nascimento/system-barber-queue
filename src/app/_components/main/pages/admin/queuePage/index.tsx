import { ButtonMenuBar } from "@/app/_components/buttonMenuBar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { HeaderQueuePage } from "./headerQueue"
import { QueuesAdmin } from "./queuesAdmin"

export const QueuePage = () => {

    const [selected, setSelected] = useState<string>('queues')
    

    return(
        <section 
        className="flex w-full h-full lg:p-10 p-4 flex-col gap-6 mt-20"
        >

       <HeaderQueuePage selected={selected} setSelected={setSelected}/>

       {
        selected === 'queues' && (
            <QueuesAdmin/>
        )
       }



        </section>
    )
}



