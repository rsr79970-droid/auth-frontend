"use client";

import { useEffect, useState } from "react";
import { getMe, updateProfile } from "@/services/user.service";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();

        setName(user.name || "");
        setBio(user.bio || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile({
        name,
        bio,
      });

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-4 border p-6 rounded-lg max-w-lg">
      <h2 className="text-xl font-semibold">Profile</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}