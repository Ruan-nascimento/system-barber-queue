interface NotificationProps {
    message: string
}

export const NotificationMessage = ({message}:NotificationProps) => {
    return(
        <div>
            <li className="p-2 border-b border-zinc-800">{message}</li>
        </div>
    )
}