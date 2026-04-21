"use client";

import { useActionState } from "react";
import { updateTask, type UpdateTaskState } from "@/actions/tasks/update-task";

type EditTaskFormProps = {
  projectId: string;
  taskId: string;
  initialTitle: string;
  initialDescription: string | null;
  initialStatus: "TODO" | "IN_PROGRESS" | "DONE";
  initialPriority: "LOW" | "MEDIUM" | "HIGH";
  initialDueDate: string;
};

const initialState: UpdateTaskState = {};

export function EditTaskForm({
  projectId,
  taskId,
  initialTitle,
  initialDescription,
  initialStatus,
  initialPriority,
  initialDueDate,
}: EditTaskFormProps) {
  const updateTaskWithIds = updateTask.bind(null, projectId, taskId);
  const [state, formAction, isPending] = useActionState(
    updateTaskWithIds,
    initialState
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
      <h2 className="text-lg font-medium mb-4">Editar tarea</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={initialTitle}
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

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="status" className="block mb-2 text-sm">
              Estado
            </label>
            <select
              id="status"
              name="status"
              defaultValue={initialStatus}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            >
              <option value="TODO">Pendiente</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="DONE">Completada</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block mb-2 text-sm">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue={initialPriority}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block mb-2 text-sm">
              Fecha límite
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={initialDueDate}
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            />
          </div>
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