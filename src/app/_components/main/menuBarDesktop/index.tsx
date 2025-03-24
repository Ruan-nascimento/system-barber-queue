import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonMenuBar } from "../../buttonMenuBar";
import { UserSelected } from "@/app/(pages)/main/[id]/page";
import { iconMap, pages } from "../menuBar";


type MenuBarProps = {
    setMenuSelected: (type: UserSelected) => void;
  menuSelected: UserSelected;
};

export const MenuBarDesktop = ({setMenuSelected, menuSelected }: MenuBarProps) => {
    return(
        <aside className="hidden p-4 bg-zinc-800/60 shadow-xl lg:flex lg:flex-col lg:gap-4 lg:w-[20%] lg:max-w-[300px] lg:h-dvh">
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
        </aside>
    )
}