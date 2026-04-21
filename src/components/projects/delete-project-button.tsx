"use client";

import { deleteProject } from "@/actions/projects/delete-project";

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const deleteProjectWithId = deleteProject.bind(null, projectId);

  return (
    <form
      action={deleteProjectWithId}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "¿Seguro que quieres eliminar este proyecto? Esta acción no se puede deshacer."
        );

        if (!confirmed) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
      >
        Eliminar proyecto
      </button>
    </form>
  );
}