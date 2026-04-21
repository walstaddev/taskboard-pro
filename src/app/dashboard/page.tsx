import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { prisma } from "@/lib/prisma";

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

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const today = new Date();

  const [
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    overdueTasks,
    recentTasks,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        userId,
      },
    }),
    prisma.task.count({
      where: {
        project: {
          userId,
        },
      },
    }),
    prisma.task.count({
      where: {
        project: {
          userId,
        },
        status: "TODO",
      },
    }),
    prisma.task.count({
      where: {
        project: {
          userId,
        },
        status: "IN_PROGRESS",
      },
    }),
    prisma.task.count({
      where: {
        project: {
          userId,
        },
        status: "DONE",
      },
    }),
    prisma.task.count({
      where: {
        project: {
          userId,
        },
        dueDate: {
          lt: today,
        },
        status: {
          not: "DONE",
        },
      },
    }),
    prisma.task.findMany({
      where: {
        project: {
          userId,
        },
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    }),
  ]);

  return (
    <AppShell>
      <AppHeader
        title="Dashboard"
        subtitle={`Resumen general de tu workspace, ${session.user.name ?? session.user.email}`}
      />

      <main className="p-8 space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total de proyectos"
            value={totalProjects}
            description="Número total de proyectos creados"
          />
          <StatsCard
            title="Total de tareas"
            value={totalTasks}
            description="Todas las tareas asociadas a tus proyectos"
          />
          <StatsCard
            title="Tareas pendientes"
            value={todoTasks}
            description="Aún no iniciadas"
          />
          <StatsCard
            title="En progreso"
            value={inProgressTasks}
            description="Actualmente activas"
          />
          <StatsCard
            title="Completadas"
            value={doneTasks}
            description="Ya finalizadas"
          />
          <StatsCard
            title="Vencidas"
            value={overdueTasks}
            description="Con fecha pasada y sin completar"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">Tareas recientes</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Últimas tareas creadas en tus proyectos
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
              >
                Ver proyectos
              </Link>
            </div>

            {recentTasks.length === 0 ? (
  <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
    <p className="text-base font-medium">Todavía no hay tareas recientes</p>
    <p className="text-sm text-zinc-400 mt-2">
      Crea tareas dentro de tus proyectos para ver aquí la actividad más reciente.
    </p>
  </div>
) : (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <article
                    key={task.id}
                    className="rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-base font-semibold">{task.title}</h3>
                        <p className="text-sm text-zinc-400 mt-2">
                          Proyecto: {task.project.name}
                        </p>
                        <p className="text-sm text-zinc-500 mt-1">
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

                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Link
                        href={`/projects/${task.projectId}`}
                        className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
                      >
                        Ver proyecto
                      </Link>

                      <Link
                        href={`/projects/${task.projectId}/tasks/${task.id}/edit`}
                        className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
                      >
                        Editar tarea
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">Proyectos recientes</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Tus últimos proyectos creados
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
              >
                Ver todos
              </Link>
            </div>

            {recentProjects.length === 0 ? (
  <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
    <p className="text-base font-medium">Todavía no hay proyectos recientes</p>
    <p className="text-sm text-zinc-400 mt-2">
      Cuando crees proyectos, aparecerán aquí con acceso rápido a su detalle y edición.
    </p>
  </div>
) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <article
                    key={project.id}
                    className="rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold">{project.name}</h3>
                        <p className="text-sm text-zinc-400 mt-2">
                          {project.description || "Sin descripción"}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300 whitespace-nowrap">
                        {project._count.tasks} tareas
                      </span>
                    </div>

                    <div className="mt-4 text-xs text-zinc-500">
                      <p>
                        Creado: {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
                      >
                        Ver detalle
                      </Link>

                      <Link
                        href={`/projects/${project.id}/edit`}
                        className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
                      >
                        Editar proyecto
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </AppShell>
  );
}