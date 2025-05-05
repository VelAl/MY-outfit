import dotenv from "dotenv";
import { Resend } from "resend";

import { T_Order } from "@/app-types-ts";
import { APP_NAME, SENDER_EMAIL } from "@/lib/constants";

import PurchaseReceiptEmail from "./purchase-receipt";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceived = async ({ order }: { order: T_Order }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};
