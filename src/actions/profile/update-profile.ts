"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validations/profile";

export type UpdateProfileState = {
  error?: string;
  success?: string;
};

export async function updateProfile(
  _prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos no válidos",
    };
  }

  const { name, email } = parsed.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      NOT: {
        id: session.user.id,
      },
    },
  });

  if (existingUser) {
    return { error: "Ese email ya está en uso por otra cuenta" };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      email,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return {
    success: "Perfil actualizado correctamente",
  };
}