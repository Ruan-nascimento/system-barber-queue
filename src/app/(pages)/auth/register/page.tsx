'use client'

import { InputAuth } from "@/app/_components/inputAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().min(1, "Telefone é Obrigatório"),
    email: z.string().optional().refine((val) => !val || z.string().email().safeParse(val).success, {
        message: "Email Inválido - exemplo@gmail.com"
    }),
    password: z.string()
    .min(8, "A Senha deve ter no mínimo 8 caracteres")
    .max(20, "A Senha não deve conter mais que 20 caracteres")
    .regex(/^[A-Za-z0-9]+$/, "A Senha deve conter apenas letras (A-Z) e nùmeros (0-9)"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message:"As senhas não coincidem",
    path: ["confirmPassword"],
});

export type RegisterForm = z.infer<typeof registerSchema>


export default function RegisterPage() {
    
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = (data: RegisterForm) => {
        console.log('Enviado')
    }

    return(

        <div
        className="h-dvh w-screen flex px-4 items-center justify-center bg-zinc-900 text-zinc-200"
        >

            <div className="w-full min-w-[300px] max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">

                <h1
                className="text-2xl font-bold text-zinc-100 mb-6 text-center"
                >Seja Nosso <b className="text-blue-500">Cliente!</b></h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <InputAuth
                    errors={errors.name}
                    message={errors.name?.message}
                    id="name"
                    register={register}
                    type="text"
                    text="Nome"
                    placeholder="Digite seu Nome"
                    />

                    <InputAuth
                    text="Telefone"
                    placeholder="Seu Telefone EX: (XX) X XXXX-XXXX"
                    errors={errors.phone}
                    message={errors.phone?.message}
                    id="phone"
                    register={register}
                    type="text"
                    />

                    <InputAuth
                    placeholder="Digite seu Email (Opcional)"
                    text="Email"
                    errors={errors.email}
                    message={errors.email?.message}
                    id="email"
                    register={register}
                    type="email"
                    />

                    <InputAuth
                    placeholder="Crie uma Senha"
                    text="Senha"
                    errors={errors.password}
                    message={errors.password?.message}
                    id="password"
                    register={register}
                    type="password"
                    showPassword={showPassword}
                    />

                    <InputAuth
                    placeholder="Confirme Sua Senha"
                    text="Confirme sua Senha"
                    errors={errors.confirmPassword}
                    message={errors.confirmPassword?.message}
                    id="confirmPassword"
                    register={register}
                    type="password"
                    showPassword={showPassword}
                    />

                    <div className="flex items-center space-x-2">

                        <input type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="h-4 w-4 text-zinc-500 bg-zinc-700 border-zinc-600 rounded focus:ring-zinc-500 cursor-pointer"
                        />

                        <label htmlFor="showPassword"
                        className="text-zinc-400 text-sm"
                        >
                            {showPassword ? "Esconder Senha" : "Mostrar Senha"}
                        </label>

                    </div>

                    <Button type="submit"
                    className="w-full bg-zinc-500 text-zinc-100 hover:bg-zinc-400 duration-200 ease-in-out cursor-pointer"
                    >
                        Registrar
                    </Button>

                </form>

            </div>

        </div>

    )
}