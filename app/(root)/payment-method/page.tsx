import { Metadata } from "next";

import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";

import PaymentMethodForm from "./form";

export const metadata: Metadata = {
  title: "Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferedMethod={user.paymentMethod}/>
    </>
  );
};

export default PaymentMethodPage;
