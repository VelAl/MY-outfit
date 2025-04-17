"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInCredsForm = () => {
  return (
    <form>
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
          <Label htmlFor="password">Email</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
          />
        </div>

        <div>
          <Button className="w-full" variant="default">
            Submit
          </Button>
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Don`t have an account?
          <Link href="/sign-up" className="link ml-2">Sign Up</Link>
        </div>
      </div>
    </form>
  );
};
export default SignInCredsForm;
