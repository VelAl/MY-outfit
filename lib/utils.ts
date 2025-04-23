import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

import { T_ErrMessage, T_SuccessMessage } from "@/app-types-ts";

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

export const createSuccessMsg = (message: string): T_SuccessMessage => ({
  message,
  success: true,
});
export const createErrMsg = (message: string): T_ErrMessage => ({
  message,
  success: false,
});

// Shorten UUID
export const formatId = (id: string) => `..${id.substring(id.length - 6)}`;

// Format Date & Time
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2025')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2025')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
