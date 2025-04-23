import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { T_ShippingAddress } from "@/app-types-ts";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { formatUSDPrice } from "@/lib/utils";

import { orderSummaryStructure } from "./helpers";
import OrderItemsTable from "./order-items-table";

export const metaData: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");
  const user = await getUserById(userId);

  if (!cart?.items.length) redirect("/cart");
  if (!user?.address) redirect("/shipping-address");
  if (!user?.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as T_ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h4 className="py-4 text-2xl">Place Order</h4>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card className="bg-muted p-2">
            <CardContent className="gap-2">
              <h2 className="text-xl mb-2 border-b">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city},{" "}
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div className="flex justify-end">
                <Link href="/shipping-address">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted p-2">
            <CardContent className="gap-2">
              <h2 className="text-xl mb-2 border-b">Payment method</h2>
              <p>{user.paymentMethod}</p>

              <div className="flex justify-end">
                <Link href="/payment-method">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted p-2 pb-4">
            <CardContent className="gap-2">
              <h2 className="text-xl mb-2 border-b">Order Items</h2>

              <OrderItemsTable items={cart.items} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="p-2">
            <CardContent className="p-4 gap-4 space-y-2">
              {orderSummaryStructure.map(({ field, title }) => (
                <div key={field} className="flex justify-between">
                  <div>{title}</div>
                  <div>{formatUSDPrice(cart[field])}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
