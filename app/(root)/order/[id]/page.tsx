import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getOrderById } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "Order Details",
};

type T_Props = {
  params: Promise<{ id: string }>;
};

export const OrderDetailPage = async ({ params }: T_Props) => {
  const { id } = await params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return <div>{+order.totalPrice}</div>;
};
export default OrderDetailPage;
