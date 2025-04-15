import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Format number with decimals
export const fomatNumWithDecimals = (num: number) => num.toFixed(2);
