"use client";

import { useActionState } from "react";
import { updateProject, type UpdateProjectState } from "@/actions/projects/update-project";

type EditProjectFormProps = {
  projectId: string;
  initialName: string;
  initialDescription: string | null;
};

const initialState: UpdateProjectState = {};

export function EditProjectForm({
  projectId,
  initialName,
  initialDescription,
}: EditProjectFormProps) {
  const updateProjectWithId = updateProject.bind(null, projectId);
  const [state, formAction, isPending] = useActionState(
    updateProjectWithId,
    initialState
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
      <h2 className="text-lg font-medium mb-4">Editar proyecto</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={initialName}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={initialDescription ?? ""}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
          />
        </div>

        {state?.error ? (
          <p className="text-sm text-red-400">{state.error}</p>
        ) : null}

        {state?.success ? (
          <p className="text-sm text-green-400">{state.success}</p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-white text-black font-medium px-4 py-2 disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}