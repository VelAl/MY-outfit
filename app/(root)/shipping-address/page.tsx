import { Metadata } from "next";
import { redirect } from "next/navigation";

import { T_ShippingAddress } from "@/app-types-ts";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

import ShippingAddressForm from "./form";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart?.items.length) return redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <div>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as T_ShippingAddress | null} />
    </div>
  );
};
export default ShippingAddressPage;
