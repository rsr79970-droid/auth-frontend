"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useLogin } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Logging in...");

    try {
      await mutateAsync(data);

      toast.success("Login successful", { id: toastId });

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed", {
        id: toastId,
      });
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-2xl font-bold">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Email"
            {...register("email", { required: true })}
          />

          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
