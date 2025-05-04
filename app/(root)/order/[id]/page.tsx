import { Metadata } from "next";
import { notFound } from "next/navigation";
import Stripe from "stripe";

import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order.actions";
import { userRoles } from "@/lib/constants";

import OrderDetailsTable from "./order-details-table";

export const metadata: Metadata = {
  title: "Order Details",
};

type T_Props = {
  params: Promise<{ id: string }>;
};

export const OrderDetailPage = async ({ params }: T_Props) => {
  const session = await auth();

  const { id } = await params;

  const order = await getOrderById(id);
  if (!order) notFound();

  let client_secret = null;

  // check if not paid and using stripe
  if (!order.isPaid && order.paymentMethod === "Stripe") {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });

    client_secret = paymentIntent.client_secret;
  }

  return (
    <div>
      <OrderDetailsTable
        order={order}
        stripeClientSecret={client_secret}
        isAdmin={session?.user.role === userRoles.ADMIN}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      />
    </div>
  );
};
export default OrderDetailPage;
