"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/branding/app-logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/profile", label: "Profile" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-zinc-950 p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <div className="mb-4 md:mb-10">
  <AppLogo compact />
</div>

      <nav className="flex flex-wrap gap-2 md:block md:space-y-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex rounded-lg px-3 py-2 text-sm transition md:flex md:w-full ${
                isActive
                  ? "bg-white text-black font-medium"
                  : "text-zinc-200 hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}