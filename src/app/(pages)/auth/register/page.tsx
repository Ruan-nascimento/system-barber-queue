"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { InputAuth } from "@/app/_components/inputAuth";
import { useAuth } from "@/lib/AuthContext";
import { Spinner } from "@/app/_components/spinner";
import { registerSchema, RegisterForm } from "@/lib/schemas/registerSchema";
import { AuthWrapper } from "@/app/_components/authWrapper";
import Image from "next/image";
import { ButtonComp } from "@/app/_components/buttonPattern";
import { UserNotFounded } from "@/app/_components/toasts/error";
import { Success } from "@/app/_components/toasts/success";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const newName = name && name[0].toUpperCase() + name.slice(1);
  const router = useRouter();
  const { setUser, user, loading } = useAuth();
  const [loadingRegister, setLoadingRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!loading && user) {
      router.push(`${API_URL}/main/${user.id}`);
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200 flex-col gap-10">
        <p className="text-2xl font-bold">Carregando...</p>
        <Spinner />
      </div>
    );
  }

  if (user) {
    <div className="h-dvh w-screen flex items-center justify-center bg-zinc-900 text-zinc-200 flex-col gap-10">
        <p className="text-2xl font-bold">Carregando...</p>
        <Spinner />
    </div>
  }

  const onSubmit = async (data: RegisterForm) => {
    setLoadingRegister(true);
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
        role: result.role,
      });

      setLoadingRegister(false);
      Success({ text: `Seja Bem Vindo(a) ${result.name}` });
      router.push(`${API_URL}/main/${result.id}`);
    } catch (error: any) {
      setLoadingRegister(false);
      UserNotFounded({ error });
    }
  };

  return (
    <AuthWrapper className="flex-row gap-4">
      <div className="w-full md:w-[60%] md:max-w-[450px] flex flex-col justify-center items-center lg:p-6">
        <h1 className="text-2xl font-bold text-zinc-100 mb-6 text-center">
          {name ? `Bem Vindo ${newName}!` : "Seja Nosso Cliente!"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 lg:space-y-2 w-full">
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

          {loadingRegister ? (
            <Spinner />
          ) : (
            <ButtonComp.root type="submit">
              Registrar
            </ButtonComp.root>
          )}
        </form>

        <div className="mt-4 text-sm cursor-pointer">
          <Link href={`${API_URL}/auth/login`}>
            Já tem uma Conta? <b className="text-orange-500">Entrar</b>
          </Link>
        </div>
      </div>

      <div className="hidden xl:bg-[url('/bg_alternative.svg')] xl:h-full xl:bg-no-repeat xl:bg-center xl:bg-cover xl:flex-1 xl:flex xl:items-center xl:justify-center xl:rounded-4xl xl:shadow-lg">
        <Image
          src={'/img/barber_logo.png'}
          alt="Logo da Barbearia"
          width={450}
          height={450}
        />
      </div>
    </AuthWrapper>
  );
}