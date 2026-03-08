"use client";

import { Suspense } from "react";
import {VerifyForm} from "@/components/auth/VerifyForm";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
