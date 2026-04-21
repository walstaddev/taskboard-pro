import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "La contraseña actual es obligatoria"),
    newPassword: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
      .max(100, "La nueva contraseña es demasiado larga"),
    confirmPassword: z
      .string()
      .min(6, "Debes confirmar la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "La nueva contraseña y la confirmación no coinciden",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña no puede ser igual a la actual",
    path: ["newPassword"],
  });