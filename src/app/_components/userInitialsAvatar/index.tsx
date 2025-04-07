import { useAuth } from "@/lib/AuthContext";
import { useMemo } from "react";

interface UserInitialsAvatarProps {
  name: string | undefined;
  size?: number;
  className?: string;
}

export const UserInitialsAvatar = ({ name, size, className }: UserInitialsAvatarProps) => {
  const { user } = useAuth();

  const initials = useMemo(() => {
    if (!name) {
      return "";
    }
    const nameParts = name.trim().split(/\s+/);
    const firstInitial = nameParts[0]?.charAt(0) || "";
    const secondInitial =
      nameParts.length > 1 ? nameParts[1]?.charAt(0) : nameParts[0]?.charAt(1) || "";
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }, [name]);

  const userColor = user?.color || "bg-gray-500";

  return (
    <div
      className={`flex items-center justify-center rounded-full text-white font-semibold ${userColor} ${className}`}
      style={{ width: size, height: size, fontSize: size! / 3 }}
      aria-label={`Avatar de ${name || "usuário"} com as iniciais ${initials}`}
    >
      {initials}
    </div>
  );
};