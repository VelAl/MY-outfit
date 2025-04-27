import { ReactNode } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  Barcode,
  CreditCardIcon,
  Eye,
  Users,
} from "lucide-react";

import { getOrdersSummary } from "@/lib/actions/order.actions";
import { formatDateTime, formatNumber, formatUSDPrice } from "@/lib/utils";

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
    Icon: <Barcode />,
    getter: ({ productsCount }) => formatNumber(productsCount),
  },
];

export const tableStructure: {
  title: string;
  getCell: (order: T_GetOrdersSummary_Res["latestSales"][number]) => ReactNode;
}[] = [
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
      <div className="flex justify-end text-primary">
        <Link
          href={`/order/${id}`}
          className="transition-transform duration-200 hover:scale-[1.2]"
        >
          <Eye />
        </Link>
      </div>
    ),
  },
];
