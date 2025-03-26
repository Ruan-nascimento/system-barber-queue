import { Input } from "@/components/ui/input"
import { RegisterForm } from "@/lib/schemas/registerSchema"
import { InputHTMLAttributes } from "react"
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form"
import { twMerge } from "tailwind-merge"

interface InputAuthProps extends InputHTMLAttributes<HTMLInputElement>{
    errors: FieldError | undefined
    register: UseFormRegister<RegisterForm>
    id: "name" | "phone" | "email" | "password" | "confirmPassword"
    type: "email" | "password" | "text"
    className?: string
    text: string
    showPassword?: boolean
    message: string | undefined
}

export const InputAuth = ({showPassword, text, errors, message, register, id, type, ...rest}: InputAuthProps) => {
    return(
        <div>
            <label htmlFor="name" className="md:block hidden text-zinc-50 mb-1">
                {text}
            </label>
            <Input
            id={id}
            type={showPassword ? "text" : `${type}`}
            {...register(id)}
            {...rest}
            className={twMerge("w-full p-2 bg-zinc-700 text-zinc-200 border border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500", rest.className)}
            />

            {errors && <p className="text-red-400 text-sm mt-1">{message}</p>}
        </div>
    )
}