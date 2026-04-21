"use client";

import { deleteTask } from "@/actions/tasks/delete-task";

type DeleteTaskButtonProps = {
  projectId: string;
  taskId: string;
};

export function DeleteTaskButton({
  projectId,
  taskId,
}: DeleteTaskButtonProps) {
  const deleteTaskWithIds = deleteTask.bind(null, projectId, taskId);

  return (
    <form
      action={deleteTaskWithIds}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "¿Seguro que quieres eliminar esta tarea? Esta acción no se puede deshacer."
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
      >
        Eliminar tarea
      </button>
    </form>
  );
}