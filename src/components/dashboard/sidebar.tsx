"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getMe } from "@/services/user.service";

import {
  LayoutDashboard,
  Settings,
  Users,
  CreditCard,
  BarChart,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getMe();
      setUser(data);
    };

    load();
  }, []);

  const menu = [
    {
      title: "Dashboard",
      items: [
        {
          name: "Overview",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    ...(user?.role === "ADMIN"
      ? [
          {
            title: "Admin",
            items: [
              {
                name: "Users",
                href: "/dashboard/admin/users",
                icon: Users,
              },
              {
                name: "Analytics",
                href: "/dashboard/admin/analytics",
                icon: BarChart,
              },
              {
                name: "Billing",
                href: "/dashboard/admin/billing",
                icon: CreditCard,
              },
            ],
          },
        ]
      : []),

    {
      title: "System",
      items: [
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-bold">Auth Practise</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-6">
        {menu.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-muted-foreground mb-2 px-2">
              {section.title}
            </p>

            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    ${
                      active
                        ? "bg-muted font-medium"
                        : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
