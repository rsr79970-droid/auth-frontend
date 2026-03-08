"use client";

import { Suspense } from "react";
import { VerifyForm } from "@/components/auth/VerifyForm";

export default function VerifyPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
