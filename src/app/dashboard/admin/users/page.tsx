"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUsers, changeUserRole } from "@/services/admin.service";
import { getMe } from "@/services/user.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const me = await getMe();

        if (me.role !== "ADMIN") {
          router.push("/dashboard");
          return;
        }

        const data = await getUsers();

        // ❗ убираем текущего пользователя
        const filtered = data.filter((user: any) => user._id !== me._id);

        setUsers(filtered);
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  const handleRoleChange = async (id: string, role: string) => {
    const toastId = toast.loading("Updating role...");

    try {
      await changeUserRole(id, role);

      toast.success("Role updated", { id: toastId });

      const me = await getMe();
      const data = await getUsers();

      const filtered = data.filter((user: any) => user._id !== me._id);

      setUsers(filtered);
    } catch {
      toast.error("Failed to update role", { id: toastId });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage platform users and roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 font-medium border-b pb-3 text-sm text-muted-foreground">
            <span>Email</span>
            <span>Plan</span>
            <span>Role</span>
            <span className="text-right">Actions</span>
          </div>

          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-4 items-center py-3 border-b text-sm"
            >
              <span className="font-medium">{user.email}</span>

              <span>{user.plan || "FREE"}</span>

              <span>
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </span>

              <div className="flex justify-end gap-2">
                {user.role !== "ADMIN" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRoleChange(user._id, "ADMIN")}
                  >
                    Make Admin
                  </Button>
                )}

                {user.role !== "USER" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleRoleChange(user._id, "USER")}
                  >
                    Make User
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
