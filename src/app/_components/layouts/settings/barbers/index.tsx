import { AddNewBarber } from "@/app/_components/addNewBarber"
import { ListAllBarbers } from "@/app/_components/listAllBarbers"

export const BarbersSettingPage = () => {
    return (
        <section
        className="bg-zinc-900 w-full h-[95%] p-4 rounded-lg overflow-auto custom-scrollbar flex  gap-4"
        >   
                <AddNewBarber/>
                <ListAllBarbers/>

        </section>
    )
}