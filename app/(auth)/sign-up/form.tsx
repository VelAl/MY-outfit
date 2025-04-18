"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AppInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { signUpUser } from "@/lib/actions/user.actions";

const SignUpForm = () => {
  const [data, action, isPending] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const goBackUrl = searchParams.get("searchParams") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="goBackUrl" value={goBackUrl} />
      <div className="space-y-4">
        <AppInput id="name" name="name" required autoComplete="name" />

        <AppInput
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />

        <AppInput id="password" name="password" type="password" required />
        <AppInput
          label="confirm password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <Button
          className="w-full"
          variant="default"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Sign Up"}
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?
          <Link href="/sign-in" className="link ml-2 underline">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;
