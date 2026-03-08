import { api } from "@/lib/axios";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const changeUserRole = async (id: string, role: string) => {
  const res = await api.patch(`/users/${id}/role`, { role });
  return res.data;
};