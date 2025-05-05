import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { updateOrderToPaid } from "@/lib/actions/order.actions";

export async function POST(req: NextRequest) {
  try {
    // build webhook event
    const event = await Stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    // check for successfull payment
    if (event.type === "charge.succeeded") {
      const { object } = event.data;

      // upd order satus
      await updateOrderToPaid({
        orderId: object.metadata.orderId,
        paymentResult: {
          id: object.id,
          status: "COMPLETED",
          email_address: object.billing_details.email!,
          pricePaid: (object.amount / 100).toFixed(),
        },
      });

      return NextResponse.json({
        message: "updateOrderToPaid was successfull",
      });
    }

    return NextResponse.json({
      message: "event is not charge.succeeded",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    console.error("Webhook error:", message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }
}
