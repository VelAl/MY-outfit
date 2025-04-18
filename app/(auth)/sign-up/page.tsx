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

import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "Sign Up",
};

type T_Props = {
  searchParams: Promise<{ goBackUrl: string }>;
};

const SignUpPage = async ({ searchParams }: T_Props) => {
  const { goBackUrl } = await searchParams;

  const session = await auth();

  if (session) return redirect(goBackUrl || "/");

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle className="text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Enter your info below to sign up
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default SignUpPage;
