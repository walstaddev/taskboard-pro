import { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-black text-white md:flex">
      <AppSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}