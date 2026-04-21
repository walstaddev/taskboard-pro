"use client";

import { useActionState } from "react";
import {
  changePassword,
  type ChangePasswordState,
} from "@/actions/profile/change-password";

const initialState: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePassword,
    initialState
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
      <h2 className="text-lg font-medium mb-4">Cambiar contraseña</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block mb-2 text-sm">
            Contraseña actual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block mb-2 text-sm">
            Nueva contraseña
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-2 text-sm">
            Confirmar nueva contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
            required
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
          {isPending ? "Actualizando..." : "Actualizar contraseña"}
        </button>
      </form>
    </section>
  );
}