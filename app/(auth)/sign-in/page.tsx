import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

import SignInCredsForm from "./form";

export const metadata: Metadata = {
  title: "Sign In",
};

type T_Props = {
  searchParams: Promise<{ goBackUrl: string }>;
};

const SignInPage = async ({ searchParams }: T_Props) => {
  const { goBackUrl } = await searchParams;

  const session = await auth();

  if (session) return redirect(goBackUrl || "/");

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign In to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SignInCredsForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default SignInPage;
