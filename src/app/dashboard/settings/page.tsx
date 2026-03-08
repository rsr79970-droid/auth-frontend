"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { getMe, updateProfile, changePassword } from "@/services/user.service";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProfileForm = {
  name: string;
  email: string;
};

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const profileForm = useForm<ProfileForm>();
  const passwordForm = useForm<PasswordForm>();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe();

      profileForm.reset({
        name: user.name,
        email: user.email,
      });

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleProfileUpdate = async (data: ProfileForm) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await updateProfile(data);
      toast.success("Profile updated", { id: toastId });
    } catch {
      toast.error("Update failed", { id: toastId });
    }
  };

  const handlePasswordChange = async (data: PasswordForm) => {
    const toastId = toast.loading("Changing password...");

    try {
      await changePassword(data);

      toast.success("Password changed", { id: toastId });

      passwordForm.reset();
    } catch {
      toast.error("Password change failed", { id: toastId });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-10 max-w-5xl">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account security
        </p>
      </div>

      {/* CARDS */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* PROFILE */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={profileForm.handleSubmit(handleProfileUpdate)}
              className="space-y-4"
            >
              <Input placeholder="Name" {...profileForm.register("name")} />

              <Input placeholder="Email" {...profileForm.register("email")} />

              <Button className="w-full" type="submit">
                Save changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* PASSWORD */}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
              className="space-y-4"
            >
              <Input
                type="password"
                placeholder="Old password"
                {...passwordForm.register("oldPassword")}
              />

              <Input
                type="password"
                placeholder="New password"
                {...passwordForm.register("newPassword")}
              />

              <Button className="w-full" type="submit">
                Update password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
