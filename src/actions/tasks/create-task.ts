"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations/task";

export type CreateTaskState = {
  error?: string;
  success?: string;
};

export async function createTask(
  projectId: string,
  _prevState: CreateTaskState,
  formData: FormData
): Promise<CreateTaskState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const parsed = taskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
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

  const { title, description, status, priority, dueDate } = parsed.data;

  await prisma.task.create({
    data: {
      projectId,
      title,
      description: description || null,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  revalidatePath(`/projects/${projectId}`);

  return {
    success: "Tarea creada correctamente",
  };
}