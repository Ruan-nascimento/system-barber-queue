import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonMenuBar } from "../../buttonMenuBar";
import { UserSelected } from "@/app/(pages)/main/[id]/page";
import { iconMap, pages } from "../menuBar";
import { Spinner } from "../../spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Icon } from "../../buttonMenuBar/icon";


type MenuBarProps = {
    setMenuSelected: (type: UserSelected) => void;
  menuSelected: UserSelected;
};

export const MenuBarDesktop = ({setMenuSelected, menuSelected }: MenuBarProps) => {
  const {loading, logout} = useAuth()

    return(
        <aside className="hidden p-4 bg-zinc-800/60 shadow-xl lg:flex lg:flex-col lg:gap-4 lg:w-[20%] lg:max-w-[300px] lg:h-dvh">
          <div className="flex flex-col flex-1 gap-4">
            {pages.map((page) => (
                          <ButtonMenuBar.root
                            key={page}
                            typed={page}
                            menuSelected={menuSelected}
                            onClick={() => setMenuSelected(page)}
                          >
                            <ButtonMenuBar.icon name={iconMap[page]} size={24} />
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                          </ButtonMenuBar.root>
                        ))}
          </div>
          
          <div>
            {loading ? <Spinner/> :
            <Button variant={"destructive"} className="bg-zinc-700 w-full h-10 cursor-pointer duration-200 ease-in-out hover:bg-red-700/80" onClick={logout}>
            LogOut
            <Icon name="LogOut" size={24} color="white"/>
            </Button>}
          </div>
        </aside>
    )
}