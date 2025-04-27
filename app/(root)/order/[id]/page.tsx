import { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order.actions";

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

  return (
    <div>
      <OrderDetailsTable
        order={order}
        isAdmin={session?.user.role === "admin"}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      />
    </div>
  );
};
export default OrderDetailPage;
