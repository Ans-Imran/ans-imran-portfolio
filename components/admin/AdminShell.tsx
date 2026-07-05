"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin",          label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/cv",       label: "CV versions" },
  { href: "/admin/content",  label: "Edit content" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <header className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-bold text-[#15803d]">
            Portfolio admin
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-[#15803d] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900"
            target="_blank"
          >
            View site ↗
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-sm font-medium border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* mobile nav */}
      <nav className="flex sm:hidden items-center gap-1 mb-5 overflow-x-auto">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap shrink-0",
                active ? "bg-[#15803d] text-white" : "text-gray-600 bg-gray-100",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}

export default AdminShell;
