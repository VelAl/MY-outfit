"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { toast } from "sonner";

import { T_Order } from "@/app-types-ts";
import OrderItemsTable from "@/components/shared/order/order-items-table";
import OrderSummaryCard from "@/components/shared/order/order-summary-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  approvePayPalOrder,
  createPayPalOrder,
} from "@/lib/actions/order.actions";
import { formatDateTime, formatId } from "@/lib/utils";

type T_Props = { order: T_Order; paypalClientId: string };

const OrderDetailsTable = ({ order, paypalClientId }: T_Props) => {
  const _handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order.id);

    if (!res.success) {
      toast.error(res.message);
      throw new Error(res.message); // PayPal SDK  calls createOrder inside try/catch
    }

    return res.data as string;
  };

  const _handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order.id, data);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  };

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Loading PayPal Error !";
    }

    return status;
  };

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto ">
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
          <OrderSummaryCard entity={order}>
            {/*PAYPAL PAYMENT*/}
            {!order.isPaid && order.paymentMethod === "PayPal" && (
              <div className="pt-4">
                <PayPalScriptProvider
                  options={{
                    clientId: paypalClientId,
                  }}
                >
                  <PrintLoadingState />
                  <PayPalButtons
                    createOrder={_handleCreatePayPalOrder}
                    onApprove={_handleApprovePayPalOrder}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </OrderSummaryCard>
        </div>
      </div>
    </>
  );
};
export default OrderDetailsTable;
