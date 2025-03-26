import { z } from "zod";

export const registerSchema = z
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

export type RegisterForm = z.infer<typeof registerSchema>;