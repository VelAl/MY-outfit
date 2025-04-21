import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//Format number with decimals
export const fomatNumWithDecimals = (num: number) => num.toFixed(2);

//Handle Errors
export const formatErorr = (err: unknown) => {
  if (err instanceof ZodError) {
    const errors = err.errors.map(
      (errField) => `${errField.path[0]}: ${errField.message}`
    );

    return "ZodError: " + errors.join(". ");
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    const field = (err.meta?.target as string[])?.[0] || "Field";
    return `${field} is already in use`;
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return "Something went wrong...";
  }
};

// Round number to 2 decimal places
export const round2 = (value: number | string) => {
  if (typeof value !== "number" && typeof value !== "string") {
    throw new TypeError("Value must be a number or a string");
  }
  if (Number.isNaN(+value)) {
    throw new TypeError("Value can not be converted into number");
  }

  return Math.round((+value + Number.EPSILON) * 100) / 100;
};

export const formatUSDPrice = (value: number | string) => {
  if (isNaN(+value)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(+value);
};
