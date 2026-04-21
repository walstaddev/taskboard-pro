"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";

export type UpdateProjectState = {
  error?: string;
  success?: string;
};

export async function updateProject(
  projectId: string,
  _prevState: UpdateProjectState,
  formData: FormData
): Promise<UpdateProjectState> {
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

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session.user.id,
    },
  });

  if (!project) {
    return { error: "Proyecto no encontrado" };
  }

  const { name, description } = parsed.data;

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name,
      description: description || null,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects/${projectId}/edit`);

  return {
    success: "Proyecto actualizado correctamente",
  };
}