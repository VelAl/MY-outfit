"use client";

import { T_Order } from "@/app-types-ts";
import OrderItemsTable from "@/components/shared/order/order-items-table";
import OrderSummaryCard from "@/components/shared/order/order-summary-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatId } from "@/lib/utils";

type T_Props = {
  order: T_Order;
};

const OrderDetailsTable = ({ order }: T_Props) => {
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card className="p-0">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl mb-4 border-b">Payment method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Badge variant="outline">
                  Paid at {formatDateTime(order.paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not paid </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl mb-4 border-b">Shipping Address</h2>
              <p>{order.shippingAddress.fullName}</p>
              <p>
                {order.shippingAddress.streetAddress},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Badge variant="secondary">
                  Paid at {formatDateTime(order.deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delidered</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl mb-4 border-b">Order Items</h2>

              <OrderItemsTable items={order.orderItems} />
            </CardContent>
          </Card>
        </div>

        <div>
          <OrderSummaryCard entity={order} />
        </div>
      </div>
    </>
  );
};
export default OrderDetailsTable;
