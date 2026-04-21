"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "@/actions/auth/register";
import { AppLogo } from "@/components/branding/app-logo";

const initialState: RegisterState = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-8 shadow">


<div className="mb-8">
    <AppLogo />
  </div>


        <h1 className="text-3xl font-semibold mb-6">Crear cuenta</h1>




        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
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
            className="w-full rounded-lg bg-white text-black font-medium py-2 disabled:opacity-50"
          >
            {isPending ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-400">
          Después podrás iniciar sesión en <strong>/login</strong>
        </p>
      </div>
    </main>
  );
}