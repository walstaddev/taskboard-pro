"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations/task";

export type UpdateTaskState = {
  error?: string;
  success?: string;
};

export async function updateTask(
  projectId: string,
  taskId: string,
  _prevState: UpdateTaskState,
  formData: FormData
): Promise<UpdateTaskState> {
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

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        userId: session.user.id,
      },
    },
  });

  if (!task) {
    return { error: "Tarea no encontrada" };
  }

  const { title, description, status, priority, dueDate } = parsed.data;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      description: description || null,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/projects/${projectId}/tasks/${taskId}/edit`);

  return {
    success: "Tarea actualizada correctamente",
  };
}