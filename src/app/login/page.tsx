"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { AppLogo } from "@/components/branding/app-logo";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-8 shadow">

<div className="mb-8">
    <AppLogo />
  </div>


        <h1 className="text-3xl font-semibold mb-6">Iniciar sesión</h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const result = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (result?.error) {
              setError("Credenciales no válidas");
              return;
            }

            window.location.href = "/dashboard";
          }}
        >
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

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-white text-black font-medium py-2"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-400">
          Si no tienes cuenta, ve a <strong>/register</strong>
        </p>
      </div>
    </main>
  );
}