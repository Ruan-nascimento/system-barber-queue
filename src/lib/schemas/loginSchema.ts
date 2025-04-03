import { z } from "zod"

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email ou telefone é obrigatório")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\(\d{2}\)\s\d{1}\s\d{4}-\d{4}$|^\d{10,11}$/;
        return emailRegex.test(value) || phoneRegex.test(value)
      },
      {
        message: "Por favor, insira um email ou telefone válido",
      }
    ),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "A senha não pode conter caracteres especiais, apenas letras e números"
    ),
})

export type LoginForm = z.infer<typeof loginSchema>