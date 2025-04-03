import { toast } from "sonner"

export const UserNotFounded = ({error}: {error: any}) => {
    toast.error(error.message || "Usuário não encontrado", {
            style: {
              background: "#18181b",
              color: "#e4e4e7",
              border: "1px solid #52525b",
            },
          })
}