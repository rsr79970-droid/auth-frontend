"use client";

import { useState } from "react";
import { changePassword } from "@/services/user.service";
import toast from "react-hot-toast";

export default function PasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      await changePassword({
        oldPassword,
        newPassword,
      });

      toast.success("Password changed");

      setOldPassword("");
      setNewPassword("");

    } catch {
      toast.error("Password change failed");
    }
  };

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-lg">
      <h2 className="text-xl font-semibold">Change Password</h2>

      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="Old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleChangePassword}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Change password
      </button>
    </div>
  );
}