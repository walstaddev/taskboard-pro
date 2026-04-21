import Link from "next/link";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { prisma } from "@/lib/prisma";
import { EditTaskForm } from "@/components/tasks/edit-task-form";

type EditTaskPageProps = {
  params: Promise<{
    id: string;
    taskId: string;
  }>;
};

function formatDateForInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default async function EditTaskPage({
  params,
}: EditTaskPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id, taskId } = await params;

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId: id,
      project: {
        userId: session.user.id,
      },
    },
    include: {
      project: true,
    },
  });

  if (!task) {
    notFound();
  }

  return (
    <AppShell>
      <AppHeader
        title="Editar tarea"
        subtitle={`Proyecto: ${task.project.name}`}
      />

      <main className="p-8 space-y-6">
        <EditTaskForm
          projectId={id}
          taskId={task.id}
          initialTitle={task.title}
          initialDescription={task.description}
          initialStatus={task.status}
          initialPriority={task.priority}
          initialDueDate={formatDateForInput(task.dueDate)}
        />

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/projects/${id}`}
            className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Volver al proyecto
          </Link>
        </div>
      </main>
    </AppShell>
  );
}