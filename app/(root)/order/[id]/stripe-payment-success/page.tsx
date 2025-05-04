import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type T_Props = {
  params: Promise<{ id: string }>; // orderId
  searchParams: Promise<{ payment_intent: string }>;
};

const SuccessPage = async ({ params, searchParams }: T_Props) => {
  const { id } = await params;
  const { payment_intent: payment_intentId } = await searchParams;

  const order = await getOrderById(id);
  if (!order) notFound();

  // retrieve payment intent
  const payment_intent = await stripe.paymentIntents.retrieve(payment_intentId);

  // check if payment_intent is valid
  if (payment_intent.metadata?.orderId !== order.id) {
    return notFound();
  }

  // check if payment is successfull
  const isSuccess = payment_intent.status === "succeeded";
  if (!isSuccess) {
    return redirect(`/order/${id}`);
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8">
      <div className="flex flex-col gap-6 items-center">
        <div className="h1 h1-bold">Thanks for your purchase!</div>
        <div>We are processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  );
};
export default SuccessPage;
