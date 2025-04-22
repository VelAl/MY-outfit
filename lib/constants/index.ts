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

// Array of regex protected paths patterns
export const protectedPaths = [
  /\/shipping-address/,
  /\/payment-method/,
  /\/place-order/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/order\/(.*)/,
  /\/admin/,
];

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS?.split(", ") || [
  "PayPal",
  "Stripe",
  "CashOnDelivery",
];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";
