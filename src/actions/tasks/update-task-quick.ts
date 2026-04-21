"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quickTaskUpdateSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type QuickUpdateTaskState = {
  error?: string;
  success?: string;
};

export async function updateTaskQuick(
  projectId: string,
  taskId: string,
  _prevState: QuickUpdateTaskState,
  formData: FormData
): Promise<QuickUpdateTaskState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "No autorizado" };
  }

  const parsed = quickTaskUpdateSchema.safeParse({
    status: formData.get("status"),
    priority: formData.get("priority"),
  });

  if (!parsed.success) {
    return { error: "Datos no válidos" };
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

  const { status, priority } = parsed.data;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
      priority,
    },
  });

  revalidatePath(`/projects/${projectId}`);

  return {
    success: "Tarea actualizada",
  };
}