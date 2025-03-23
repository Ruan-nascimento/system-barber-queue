import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonMenuBar } from "../../buttonMenuBar";
import { UserSelected } from "@/app/(pages)/main/[id]/page";

type LucideIconName = "List" | "Clock" | "LayoutDashboard";

type MenuBarProps = {
  setOpenMenu: (open: boolean) => void;
  openMenu: boolean;
  menuSelected: UserSelected;
  setMenuSelected: (type: UserSelected) => void;
};

export const MenuBarMobile = ({
  openMenu,
  setOpenMenu,
  setMenuSelected,
  menuSelected,
}: MenuBarProps) => {
  const pages: UserSelected[] = ["dashboard", "queue", "history"];

  const iconMap: Record<UserSelected, LucideIconName> = {
    dashboard: "LayoutDashboard",
    queue: "List",
    history: "Clock",
  };

  return (
    <AnimatePresence>
      {openMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpenMenu(false)}
          className="bg-black/60 w-screen h-dvh absolute z-10"
        >
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 lg:bg-zinc-800 w-[50%] max-w-[400px] h-full rounded-r p-4 flex flex-col gap-4"
          >
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
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};