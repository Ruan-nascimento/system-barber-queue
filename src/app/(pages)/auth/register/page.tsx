"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { toast } from "sonner";
import { InputAuth } from "@/app/_components/inputAuth";
import { useAuth } from "@/lib/AuthContext";
import { Spinner } from "@/app/_components/spinner";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().min(1, "Telefone é Obrigatório"),
    email: z.string().optional().refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Email Inválido - exemplo@gmail.com",
    }),
    password: z
      .string()
      .min(8, "A Senha deve ter no mínimo 8 caracteres")
      .max(20, "A Senha não deve conter mais que 20 caracteres")
      .regex(/^[A-Za-z0-9]+$/, "A Senha deve conter apenas letras (A-Z) e números (0-9)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const newName = name && name[0].toUpperCase() + name.slice(1);
  const router = useRouter();
  const { setUser, user, loading} = useAuth();
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!loading && user) {
      if(user.role === 'admin') {

        router.push(`${API_URL}/main/${user.id}`);
      } else if (user.role === 'client') {
        router.push(`${API_URL}/client/${user.id}`);
      }
    }
  }, [loading, user, router]);


  if (loading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
        <p>Carregando...</p>
      </div>
    );
  }

  const onSubmit = async (data: RegisterForm) => {
    setLoadingRegister(true)
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao Cadastrar");
      }

      setUser({
        id: result.id,
        name: result.name,
        phone: result.phone,
        email: result.email || null,
        role: result.role
      });

      setLoadingRegister(false)

      toast.success("Cadastro concluído com sucesso!", {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        },
      });

      if (result.role === 'admin') {

        router.push(`${API_URL}/main/${user?.id}`);
      } else {
        router.push(`${API_URL}/client/${user?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar", {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        },
      });
    }
  };

  return (
    <div className="h-dvh w-screen flex flex-col gap-4 px-4 items-center justify-center bg-zinc-900 text-zinc-200">
      <div className="w-full min-w-[300px] max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-zinc-100 mb-6 text-center">
          {name ? `Bem Vindo ${newName}!` : "Seja Nosso Cliente!"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputAuth
            onChange={(e) => setName(e.target.value)}
            value={name}
            errors={errors.name}
            message={errors.name?.message}
            id="name"
            register={register}
            type="text"
            text="Nome"
            placeholder="Digite seu Nome"
          />
          <InputAuth
            placeholder="Seu Telefone EX: (XX) X XXXX-XXXX"
            errors={errors.phone}
            id="phone"
            text="Telefone"
            message={errors.phone?.message}
            register={register}
            type="text"
          />
          <InputAuth
            placeholder="Digite seu Email (Opcional)"
            text="Email"
            message={errors.email?.message}
            errors={errors.email}
            id="email"
            register={register}
            type="email"
          />
          <InputAuth
            placeholder="Crie uma Senha"
            text="Senha"
            message={errors.password?.message}
            errors={errors.password}
            id="password"
            register={register}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
          />
          <InputAuth
            placeholder="Confirme Sua Senha"
            text="Confirme sua Senha"
            message={errors.confirmPassword?.message}
            errors={errors.confirmPassword}
            id="confirmPassword"
            register={register}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-zinc-500 bg-zinc-700 border-zinc-600 rounded focus:ring-zinc-500 cursor-pointer"
            />
            <label htmlFor="showPassword" className="text-zinc-400 text-sm">
              {showPassword ? "Esconder Senha" : "Mostrar Senha"}
            </label>
          </div>

          {
            loadingRegister ? <Spinner/> :
            <Button
            type="submit"
            className="w-full bg-blue-600 text-zinc-100 hover:bg-blue-500 duration-200 ease-in-out cursor-pointer"
          >
            Registrar
          </Button>
          }
        </form>

        <div className="mt-4 text-sm cursor-pointer">
          <Link href={`${API_URL}/auth/login`}>
            Já tem uma Conta? <b className="text-blue-500">Entrar</b>
          </Link>
        </div>
      </div>

      <Button
        onClick={e => router.push(`${API_URL}/`)}
        className="w-full min-w-[300px] max-w-md bg-zinc-700 duration-200 ease-in-out hover:bg-zinc-600 active:bg-zinc-500 cursor-pointer"
        >Voltar</Button>
    </div>
  );
}