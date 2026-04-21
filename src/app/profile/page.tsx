import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { ProfileForm } from "@/components/profile/profile-form";
import { DeleteAccountButton } from "@/components/profile/delete-account-button";
import { ChangePasswordForm } from "@/components/profile/change-password-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <AppShell>
      <AppHeader
        title="Profile"
        subtitle="Gestiona la información básica de tu cuenta."
      />

      <main className="p-8 space-y-8">

  <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-medium mb-4">Información actual</h2>

          <div className="space-y-2 text-sm text-zinc-300">
            <p>
              <strong>Nombre:</strong> {session.user.name ?? "Sin nombre"}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>ID:</strong> {session.user.id}
            </p>
          </div>
        </section>


        <ProfileForm
          initialName={session.user.name ?? ""}
          initialEmail={session.user.email ?? ""}
        />


  <ChangePasswordForm />

      

<section className="rounded-2xl border border-red-500/20 bg-zinc-950 p-6">
  <h2 className="text-lg font-medium mb-4 text-red-400">Zona peligrosa</h2>

  <p className="text-sm text-zinc-400 mb-4">
    Si eliminas tu cuenta, también se borrarán todos tus proyectos y tareas.
    Esta acción no se puede deshacer.
  </p>

  <DeleteAccountButton />
</section>


      </main>
    </AppShell>
  );
}