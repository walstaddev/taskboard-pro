import { SignOutButton } from "@/components/auth/sign-out-button";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className="border-b border-white/10 px-6 py-5 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-zinc-400 mt-1 break-words">{subtitle}</p>
          ) : null}
        </div>

        <div className="shrink-0">
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}