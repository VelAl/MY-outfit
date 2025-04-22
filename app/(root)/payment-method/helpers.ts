import { PAYMENT_METHODS } from "@/lib/constants";

export const paymentMethodsNames: {
  [key: (typeof PAYMENT_METHODS)[number]]: string;
} = {
  PayPal: "PayPal",
  Stripe: "Stripe",
  CashOnDelivery: "Cash On Delivery",
} as const;
