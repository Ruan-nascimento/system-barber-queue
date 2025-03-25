import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { UserSelected } from "@/app/(pages)/main/[id]/page";
import { Icon } from "lucide-react";

interface RootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  menuSelected: UserSelected;
  typed: UserSelected;
}

export const Root = ({ children, menuSelected, typed, className, ...rest }: RootProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        `w-full h-12 flex items-center px-4 justify-start gap-2 rounded-md duration-200 ease-in-out hover:shadow cursor-pointer ${
          typed === menuSelected
            ? "bg-blue-600 hover:bg-blue-600/80 active:bg-blue-800/50"
            : "bg-zinc-800 hover:bg-zinc-800/80 active:bg-zinc-800/50 border border-zinc-600"
        }`,
        className
      )}
    >
      {children}
    </button>
  );
};
