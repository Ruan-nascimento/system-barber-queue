import { Button } from "@/components/ui/button"
import { Icon } from "../buttonMenuBar/icon"
import { useState } from "react"
import { useNotification } from "@/lib/NotificationContext"

export const Notification = () => {

    const {isNotificationModalOpen, closeNotificationModal, openNotificationModal} = useNotification()

    return(
        <div className="">
            <Button 
            onClick={() => {
                isNotificationModalOpen ? closeNotificationModal() : openNotificationModal()
            }}
            className={`hover:bg-blue-700 duration-200 ease-in-out cursor-pointer ${isNotificationModalOpen ? "bg-blue-700" : "bg-transparent"}`}>
                <Icon name="Bell" size={24} color="white"/>
            </Button>

        </div>
    )
}