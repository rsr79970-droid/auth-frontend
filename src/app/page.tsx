import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-6 max-w-xl px-6">
        <h1 className="text-5xl font-bold">Auth System 🔐</h1>

        <p className="text-zinc-400 text-lg">
          Secure authentication system with register, login and protected
          routes.
        </p>

        <div className="flex gap-4 mt-4">
          <Link href="/auth/register">
            <Button size="lg" className="px-8">
              Register
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="px-8">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
