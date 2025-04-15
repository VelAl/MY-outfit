import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Convert prisma obj into a regular JS obj
export const convertoToJSObj = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));
