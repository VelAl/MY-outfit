"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AppInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { signInWithCreds } from "@/lib/actions/user.actions";

const SignInCredsForm = () => {
  const [data, action, isPending] = useActionState(signInWithCreds, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("searchParams") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <AppInput
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />

        <AppInput id="password" name="password" type="password" required />

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
