import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(2, "El título es obligatorio")
    .max(120, "El título no puede superar los 120 caracteres"),
  description: z
    .string()
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .optional()
    .or(z.literal("")),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional().or(z.literal("")),
});