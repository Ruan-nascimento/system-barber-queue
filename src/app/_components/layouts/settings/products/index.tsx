import { AddNewItem } from "@/app/_components/addNewItem"
import { ListAllItems } from "@/app/_components/listAllItems"

export const ProductsSettingPage = () => {
    return(
        <section
        className="bg-zinc-900 w-full h-[95%] p-4 rounded-lg overflow-auto custom-scrollbar flex  gap-4"
        >
            <AddNewItem/>
            <ListAllItems/>
        </section>
    )
}