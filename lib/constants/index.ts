import { E_AppThemes } from "@/app-types-ts";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "MY-outfit";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "E-com platform built with Next.js";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const appThemes: E_AppThemes[] = [
  E_AppThemes.SYSTEM,
  E_AppThemes.LIGHT,
  E_AppThemes.DARK,
];

export const LATEST_PRODS_LIMIT = Number(process.env.LATEST_PRODS_LIMIT || 4);
