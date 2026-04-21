"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";

export type CreateProjectState = {
  error?: string;
  success?: string;
};

export async function createProject(
  _prevState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const parsed = projectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Datos no válidos",
    };
  }

  const { name, description } = parsed.data;

  await prisma.project.create({
    data: {
      name,
      description: description || null,
      userId: session.user.id,
    },
  });

  revalidatePath("/projects");

  return {
    success: "Proyecto creado correctamente",
  };
}