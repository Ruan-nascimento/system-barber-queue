import { useState } from "react"
import { ListAllUsers } from "./ListAllUsers"
import { RegisterNewUser } from "./RegisterNewUser"

export const AddSomeOneInQueue = () =>{

    const [newUserAdded, setNewUserAdded] = useState<boolean>(false) 

    return(
        <section className="flex flex-col lg:flex-row gap-4 h-full max-h-[90%] overflow-clip">
            <ListAllUsers  newUserAdded={newUserAdded} setNewUserAdded={setNewUserAdded}/>

            <RegisterNewUser setNewUserAdded={setNewUserAdded}/>
        </section>
    )
}