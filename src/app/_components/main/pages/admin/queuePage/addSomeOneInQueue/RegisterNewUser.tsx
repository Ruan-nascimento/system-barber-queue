import { InputAuth } from "@/app/_components/inputAuth"
import { Spinner } from "@/app/_components/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { API_URL } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

export const RegisterNewUser = ({setNewUserAdded}: {setNewUserAdded: (val:boolean)=> void}) => {

    const {setUser} = useAuth()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

     const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
      });

      const onSubmit = async (data: RegisterForm) => {
        setLoading(true)
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

            setLoading(false)
      
            toast.success("Novo Usuário Cadastrado!", {
              style: {
                background: "#18181b",
                color: "#e4e4e7",
                border: "1px solid #52525b",
              },
            });

            reset()
            setNewUserAdded(true)

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
        <section className="bg-zinc-800 shadow-md p-4 rounded-md w-full flex gap-4 items-center flex-col max-w-[40%] max-h-[600px]"> 
            <h1 className="text-2xl underline-offset-8 underline">Cadastre um novo Cliente</h1>           
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                  loading ? <Spinner/> :
                  <Button
                type="submit"
                className="w-full bg-blue-600 text-zinc-100 hover:bg-blue-500 duration-200 ease-in-out cursor-pointer"
                >
                Registrar
                </Button>
                }
            </form>
        </section>
    )
}