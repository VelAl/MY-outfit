"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCreds } from "@/lib/actions/user.actions";

const SignInCredsForm = () => {
  const [data, action, isPending] = useActionState(signInWithCreds, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const goBackUrl = searchParams.get("searchParams") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="goBackUrl" value={goBackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <Button
          className="w-full"
          variant="default"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Sign In"}
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          Don’t have an account?
          <Link href="/sign-up" className="link ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};
export default SignInCredsForm;
