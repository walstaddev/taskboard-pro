import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es obligatorio")
    .max(80, "El nombre no puede superar los 80 caracteres"),
  email: z
    .string()
    .email("Email no válido"),
});