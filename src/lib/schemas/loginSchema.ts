import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email ou telefone é obrigatório")
    .email("Por favor, insira um email válido"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "A senha não pode conter caracteres especiais, apenas letras e números"
    ),
});

export type LoginForm = z.infer<typeof loginSchema>;