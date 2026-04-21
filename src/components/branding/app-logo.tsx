type AppLogoProps = {
  compact?: boolean;
};

export function AppLogo({ compact = false }: AppLogoProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black font-bold">
          TB
        </div>

        <div>
          <p className="text-lg font-semibold leading-none">TaskBoard Pro</p>
          <p className="text-xs text-zinc-400 mt-1">Workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black text-lg font-bold shadow-sm">
        TB
      </div>

      <h1 className="mt-4 text-2xl font-bold">TaskBoard Pro</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Project & task management workspace
      </p>
    </div>
  );
}