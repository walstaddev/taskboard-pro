import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre del proyecto es obligatorio")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  description: z
    .string()
    .max(500, "La descripción no puede superar los 500 caracteres")
    .optional()
    .or(z.literal("")),
});