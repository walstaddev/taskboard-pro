"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteTask(projectId: string, taskId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
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
    throw new Error("Tarea no encontrada");
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath(`/projects/${projectId}`);
}