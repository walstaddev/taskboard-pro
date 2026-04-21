"use client";

import { deleteAccount } from "@/actions/profile/delete-account";

export function DeleteAccountButton() {
  return (
    <form
      action={deleteAccount}
      onSubmit={(e) => {
        const confirmed = window.confirm(
          "¿Seguro que quieres eliminar tu cuenta? Se borrarán también tus proyectos y tareas. Esta acción no se puede deshacer."
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
        Eliminar cuenta
      </button>
    </form>
  );
}