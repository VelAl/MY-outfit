import { ReactNode } from "react";
import { BadgeDollarSign, Barcode, CreditCardIcon, Users } from "lucide-react";

import { T_Columns } from "@/app-types-ts";
import { ViewItemLink } from "@/components/shared/view-item-link";
import { getOrdersSummary } from "@/lib/actions/order.actions";
import { formatDateTime, formatNumber, formatUSDPrice } from "@/lib/utils";

type T_GetOrdersSummary_Res = Awaited<ReturnType<typeof getOrdersSummary>>;
type T_Order = T_GetOrdersSummary_Res["latestSales"][number];

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
    Icon: <Barcode />,
    getter: ({ productsCount }) => formatNumber(productsCount),
  },
];

export const tableStructure: T_Columns<T_Order> = [
  {
    title: "BUYER",
    getCell: ({ user }) => user?.name || "Deleted User",
  },
  {
    title: "DATE",
    getCell: ({ createdAt }) => formatDateTime(createdAt).dateTime,
  },
  {
    title: "TOTAL",
    getCell: ({ totalPrice }) => formatUSDPrice(totalPrice),
  },
  {
    title: "",
    getCell: ({ id }) => (
      <div className="flex justify-end">
        <ViewItemLink href={`/order/${id}`} />
      </div>
    ),
  },
];
