import Link from "next/link";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { prisma } from "@/lib/prisma";
import { DeleteProjectButton } from "@/components/projects/delete-project-button";
import { CreateTaskForm } from "@/components/tasks/create-task-form";
import { DeleteTaskButton } from "@/components/tasks/delete-task-button";
import { QuickTaskUpdateForm } from "@/components/tasks/quick-task-update-form";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatStatus(status: string) {
  switch (status) {
    case "TODO":
      return "Pendiente";
    case "IN_PROGRESS":
      return "En progreso";
    case "DONE":
      return "Completada";
    default:
      return status;
  }
}

function formatPriority(priority: string) {
  switch (priority) {
    case "LOW":
      return "Baja";
    case "MEDIUM":
      return "Media";
    case "HIGH":
      return "Alta";
    default:
      return priority;
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <AppHeader
        title={project.name}
        subtitle="Detalle del proyecto"
      />

      <main className="p-8 space-y-8">
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-medium mb-4">Información del proyecto</h2>

          <div className="space-y-4 text-sm text-zinc-300">
            <div>
              <p className="text-zinc-500 mb-1">Nombre</p>
              <p>{project.name}</p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">Descripción</p>
              <p>{project.description || "Sin descripción"}</p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">Fecha de creación</p>
              <p>{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-zinc-500 mb-1">ID del proyecto</p>
              <p className="break-all">{project.id}</p>
            </div>
          </div>
        </section>

        <CreateTaskForm projectId={project.id} />

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-medium mb-4">Tareas del proyecto</h2>

          {project.tasks.length === 0 ? (
  <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
    <p className="text-base font-medium">Este proyecto aún no tiene tareas</p>
    <p className="text-sm text-zinc-400 mt-2">
      Añade la primera tarea desde el formulario superior para empezar a gestionar el trabajo.
    </p>
  </div>
) : (
            <div className="space-y-4">
              {project.tasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{task.title}</h3>

                      <p className="text-sm text-zinc-400 mt-2">
                        {task.description || "Sin descripción"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-300">
                        Estado: {formatStatus(task.status)}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-300">
                        Prioridad: {formatPriority(task.priority)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-zinc-500 space-y-1">
                    <p>Creada: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <p>
                      Fecha límite:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "Sin fecha límite"}
                    </p>
                  </div>


                  <QuickTaskUpdateForm
  projectId={project.id}
  taskId={task.id}
  currentStatus={task.status}
  currentPriority={task.priority}
/>




             <div className="mt-4 flex gap-2 flex-wrap">
  <Link
    href={`/projects/${project.id}/tasks/${task.id}/edit`}
    className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
  >
    Editar tarea
  </Link>

  <DeleteTaskButton projectId={project.id} taskId={task.id} />
</div>

                </article>
              ))}
            </div>
          )}
        </section>

        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/projects/${project.id}/edit`}
            className="inline-flex rounded-lg bg-white text-black px-4 py-2 text-sm font-medium"
          >
            Editar proyecto
          </Link>

          <DeleteProjectButton projectId={project.id} />

          <Link
            href="/projects"
            className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Volver a proyectos
          </Link>
        </div>
      </main>
    </AppShell>
  );
}