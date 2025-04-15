import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Convert prisma obj into a regular JS obj
export const converЕoToJSObj = <T, K>(value: K) =>
  JSON.parse(JSON.stringify(value)) as T;

//Format number with decimals
export const fomatNumWithDecimals = (num: number) => num.toFixed(2);
