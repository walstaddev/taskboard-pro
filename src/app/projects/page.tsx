import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { prisma } from "@/lib/prisma";
import { CreateProjectForm } from "@/components/projects/create-project-form";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <AppHeader
        title="Projects"
        subtitle="Crea y gestiona tus proyectos."
      />

      <main className="p-8 space-y-8">
        <CreateProjectForm />

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-medium mb-4">Tus proyectos</h2>

          {projects.length === 0 ? (
  <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-6 text-center">
    <p className="text-base font-medium">Todavía no tienes proyectos</p>
    <p className="text-sm text-zinc-400 mt-2">
      Crea tu primer proyecto para empezar a organizar tareas y hacer seguimiento del trabajo.
    </p>
  </div>
) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block rounded-xl border border-white/10 bg-black/30 p-4 transition hover:bg-white/5 hover:border-white/20"
                >
                  <h3 className="text-base font-semibold">{project.name}</h3>

                  <p className="text-sm text-zinc-400 mt-2">
                    {project.description || "Sin descripción"}
                  </p>

                  <p className="text-xs text-zinc-500 mt-4">
                    Creado: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </AppShell>
  );
}