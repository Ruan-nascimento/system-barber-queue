import { useMemo } from "react"

interface UserInitialsAvatarProps {
    name: string | undefined
    size?: number
    className?: string
}

export const UserInitialsAvatar = ({ name, size, className}: UserInitialsAvatarProps) => {
    const generateRandomColor = () => {
        const colors = [
          "bg-red-500",
          "bg-blue-500",
          "bg-green-500",
          "bg-yellow-500",
          "bg-purple-500",
          "bg-pink-500",
          "bg-indigo-500",
          "bg-teal-500",
          "bg-orange-500",
        ]

        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex]

    }

    const initials = useMemo(() => {
        if (!name) {
            return ""
        }
        const nameParts = name.trim().split('/\s+/')
        const firstInitial = nameParts[0]?.charAt(0) || ''
        const secondInitial = nameParts.length > 1 ? nameParts[1]?.charAt(0) : nameParts[0]?.charAt(1) || ''
        return `${firstInitial}${secondInitial}`.toUpperCase()
    }, [name])

    const randomColor = useMemo(() => generateRandomColor(), [])

    return(
        <div
      className={`flex items-center justify-center rounded-full text-white font-semibold ${randomColor} ${className}`}
      style={{ width: size, height: size, fontSize: size! / 3 }}
    >
      {initials}
    </div>
    )
}