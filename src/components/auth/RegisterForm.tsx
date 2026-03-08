"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useRegister } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Creating account...");

    try {
      await mutateAsync(data);

      toast.success("Account created", { id: toastId });

      router.push(`/auth/verify?email=${data.email}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed", {
        id: toastId,
      });
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-2xl font-bold">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...register("name", { required: true })} />

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
            {isPending ? "Creating..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
