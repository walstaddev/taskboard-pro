"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteProject(projectId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session.user.id,
    },
  });

  if (!project) {
    throw new Error("Proyecto no encontrado");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/projects");
  redirect("/projects");
}