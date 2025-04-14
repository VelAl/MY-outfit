"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-destructive">
      <Image
        priority
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        src={"/images/logo.svg"}
      />

      <h1 className="text-3xl font-bold mt-16">Not Found</h1>

      <p>Could not find the requested page</p>

      <Button
        variant="secondary"
        className="mt-16 ml-2"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Home Page
      </Button>
    </div>
  );
};
export default NotFoundPage;
