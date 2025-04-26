import { ReactNode } from "react";
import { BadgeDollarSign, Barcode, CreditCardIcon, Users } from "lucide-react";

import { getOrdersSummary } from "@/lib/actions/order.actions";
import { formatNumber, formatUSDPrice } from "@/lib/utils";

type T_GetOrdersSummary_Res = Awaited<ReturnType<typeof getOrdersSummary>>;

export const statisticsStructure: {
  title: string;
  Icon: ReactNode;
  getter: (summary: T_GetOrdersSummary_Res) => number | string;
}[] = [
  {
    title: "Total Revenue",
    Icon: <BadgeDollarSign />,
    getter: ({ totalSales }) => formatUSDPrice(totalSales._sum.totalPrice || 0),
  },
  {
    title: "Sales",
    Icon: <CreditCardIcon />,
    getter: ({ ordersCount }) => formatNumber(ordersCount),
  },
  {
    title: "Customers",
    Icon: <Users />,
    getter: ({ usersCount }) => formatNumber(usersCount),
  },
  {
    title: "Products",
    Icon: 
    <Barcode />
    ,
    getter: ({productsCount}) => formatNumber(productsCount),
  },
];
