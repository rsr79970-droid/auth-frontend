"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useLogout } from "@/hooks/useAuth";
import { getMe } from "@/services/user.service";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import toast from "react-hot-toast";

export default function DashboardHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const load = async () => {
      const data = await getMe();
      setUser(data);
    };

    load();
  }, []);

  const { mutateAsync } = useLogout();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await mutateAsync();

      toast.success("Logged out", { id: toastId });

      router.push("/auth/login");
    } catch {
      toast.error("Logout failed", { id: toastId });
    }
  };

  return (
    <header className="flex items-center justify-between border-b pb-4">
      <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="cursor-pointer size-10">
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/billing")}>
            Billing
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
