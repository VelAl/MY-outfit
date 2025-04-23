import { ReactNode } from "react";

import { T_Cart, T_Order } from "@/app-types-ts";
import { Card, CardContent } from "@/components/ui/card";
import { formatUSDPrice } from "@/lib/utils";

export const orderSummaryStructure = [
  { title: "Items", field: "itemsPrice" },
  { title: "Tax", field: "taxPrice" },
  { title: "Shipping", field: "shippingPrice" },
  { title: "Total", field: "totalPrice" },
] as const;

type T_Props = {
  entity: T_Cart | T_Order;
  children?: ReactNode;
};

function OrderSummaryCard({ entity, children }: T_Props) {
  return (
    <Card className="p-2">
      <CardContent className="p-4 gap-4 space-y-2">
        {orderSummaryStructure.map(({ field, title }) => (
          <div key={field} className="flex justify-between">
            <div>{title}</div>
            <div>{formatUSDPrice(entity[field])}</div>
          </div>
        ))}

        {children}
      </CardContent>
    </Card>
  );
}
export default OrderSummaryCard;
