import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { prisma } from "@/lib/prisma";
import { EditProjectForm } from "@/components/projects/edit-project-form";
import Link from "next/link";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
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
  });

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <AppHeader
        title="Editar proyecto"
        subtitle={`Actualizando: ${project.name}`}
      />

      <main className="p-8 space-y-6">
        <EditProjectForm
          projectId={project.id}
          initialName={project.name}
          initialDescription={project.description}
        />

        <div className="flex gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            Volver al detalle
          </Link>

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