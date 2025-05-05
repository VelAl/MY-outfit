import { T_Order } from "@/app-types-ts";
import { formatUSDPrice } from "@/lib/utils";

const dateFormater = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export const headingStructure = [
  { title: "Order ID", get: ({ id }: T_Order) => id.toString() },
  {
    title: "Purchase Date",
    get: ({ paidAt }: T_Order) => dateFormater.format(paidAt as Date),
  },
  {
    title: "Price Paid",
    get: ({ totalPrice }: T_Order) => formatUSDPrice(totalPrice),
  },
] as const;

export const priceRowsStructure = [
  { name: "Items", key: "itemsPrice" },
  { name: "Tax", key: "taxPrice" },
  { name: "Shipping", key: "shippingPrice" },
  { name: "Total", key: "totalPrice" },
] as const;
