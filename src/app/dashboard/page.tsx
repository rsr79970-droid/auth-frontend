"use client";

import { getMe } from "@/services/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground text-lg">Loading dashboard...</p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* Welcome */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome back, {user.name}
        </h2>

        <p className="text-muted-foreground">
          Here is an overview of your account
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">12</p>
            <p className="text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">5</p>
            <p className="text-muted-foreground">Collaborators</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">42%</p>
            <p className="text-muted-foreground">Monthly usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>

          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
