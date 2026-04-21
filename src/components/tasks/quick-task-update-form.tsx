"use client";

import { useActionState } from "react";
import {
  updateTaskQuick,
  type QuickUpdateTaskState,
} from "@/actions/tasks/update-task-quick";

type QuickTaskUpdateFormProps = {
  projectId: string;
  taskId: string;
  currentStatus: "TODO" | "IN_PROGRESS" | "DONE";
  currentPriority: "LOW" | "MEDIUM" | "HIGH";
};

const initialState: QuickUpdateTaskState = {};

export function QuickTaskUpdateForm({
  projectId,
  taskId,
  currentStatus,
  currentPriority,
}: QuickTaskUpdateFormProps) {
  const updateTaskQuickWithIds = updateTaskQuick.bind(null, projectId, taskId);
  const [state, formAction, isPending] = useActionState(
    updateTaskQuickWithIds,
    initialState
  );

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor={`status-${taskId}`} className="block mb-2 text-xs text-zinc-400">
            Estado
          </label>
          <select
            id={`status-${taskId}`}
            name="status"
            defaultValue={currentStatus}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none"
          >
            <option value="TODO">Pendiente</option>
            <option value="IN_PROGRESS">En progreso</option>
            <option value="DONE">Completada</option>
          </select>
        </div>

        <div>
          <label htmlFor={`priority-${taskId}`} className="block mb-2 text-xs text-zinc-400">
            Prioridad
          </label>
          <select
            id={`priority-${taskId}`}
            name="priority"
            defaultValue={currentPriority}
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm outline-none"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
      </div>

      {state?.error ? (
        <p className="text-xs text-red-400">{state.error}</p>
      ) : null}

      {state?.success ? (
        <p className="text-xs text-green-400">{state.success}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5 disabled:opacity-50"
      >
        {isPending ? "Actualizando..." : "Actualizar estado y prioridad"}
      </button>
    </form>
  );
}