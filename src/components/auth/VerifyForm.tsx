"use client";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useVerify } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FormData = {
  email: string;
  code: string;
};

export default function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") || "";

  const { mutateAsync, isPending } = useVerify();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Verifying...");

    try {
      await mutateAsync(data);

      toast.success("Email verified!", { id: toastId });

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed", {
        id: toastId,
      });
    }
  };

  return (
    <Card className="w-[400px]">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-2xl font-bold">Verify Email</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Email" {...register("email")} />

          <Input
            placeholder="Verification code"
            {...register("code", { required: true })}
          />

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
