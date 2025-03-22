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
import { useAuth } from "@/lib/AuthContext";
import { InputAuthLogin } from "@/app/_components/InputAuthLogin";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email ou telefone é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { setUser, user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!loading && user) {
      router.push(`${API_URL}/main/${user.id}`);
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200">
        <p>Carregando...</p>
      </div>
    );
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao fazer login");
      }

      setUser({
        id: result.id,
        name: result.name,
        phone: result.phone,
        email: result.email || null,
      });

      toast.success("Login realizado com sucesso!", {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        },
      });

      router.push(`${API_URL}/main/${user?.id}`);
    } catch (error: any) {
      toast.error(error.message || "Usuário não encontrado", {
        style: {
          background: "#18181b",
          color: "#e4e4e7",
          border: "1px solid #52525b",
        }
      });
    }
  };

  return (
    <div className="h-dvh w-screen flex flex-col gap-2 px-4 items-center justify-center bg-zinc-900 text-zinc-200">

      <div className="w-full min-w-[300px] max-w-md p-6 bg-zinc-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-zinc-100 mb-6 text-center">
          Faça Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <InputAuthLogin
                errors={errors.identifier}
                message={errors.identifier?.message}
                id="identifier"
                register={register}
                type="text"
                text="Email ou Telefone"
                placeholder="Digite seu email ou telefone"
            />
            <InputAuthLogin
                errors={errors.password}
                message={errors.password?.message}
                id="password"
                register={register}
                type={showPassword ? "text" : "password"}
                text="Senha"
                placeholder="Digite sua senha"
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

          <Button
            type="submit"
            className="w-full bg-blue-600 text-zinc-100 hover:bg-blue-500 duration-200 ease-in-out cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
              Entrar
          </Button>
        </form>

        <div className="mt-4 text-sm cursor-pointer">
          <Link href={`${API_URL}/auth/register`}>
            Não tem uma conta? <b className="text-blue-500">Registrar</b>
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