import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Format number with decimals
export const fomatNumWithDecimals = (num: number) => num.toFixed(2);

//Handle Errors
export const formatErorr = (err: unknown) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map((errField) => errField.message);

    return errors.join(". ");
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const field = (err.meta?.target as string[])?.[0] || "Field";
    return `${field} is already in use`;
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "Registration failed. Please try again.";
  }
};
