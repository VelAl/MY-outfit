import { ReactNode } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { T_Order } from "@/app-types-ts";
import { formatDateTime, formatId, formatUSDPrice } from "@/lib/utils";

type T_OrderFromDB = Pick<
  T_Order,
  "id" | "createdAt" | "totalPrice" | "paidAt" | "deliveredAt"
>;

export const tableRows: {
  title: string;
  getCell: (order: T_OrderFromDB) => ReactNode;
}[] = [
  {
    title: "ID",
    getCell: ({ id }) => formatId(id),
  },
  {
    title: "CREATED",
    getCell: ({ createdAt }) => formatDateTime(createdAt).dateTime,
  },
  {
    title: "TOTAL",
    getCell: ({ totalPrice }) => formatUSDPrice(totalPrice),
  },
  {
    title: "PAID",
    getCell: ({ paidAt }) => (paidAt ? formatDateTime(paidAt).dateTime : "-"),
  },
  {
    title: "DELIVERED",
    getCell: ({ deliveredAt }) =>
      deliveredAt ? formatDateTime(deliveredAt).dateTime : "-",
  },
  {
    title: "",
    getCell: ({ id }) => (
      <Link href={`/order/${id}`} className="">
        <div className="flex justify-end text-primary">
          <Eye className="transition-transform duration-200 hover:scale-110" />
        </div>
      </Link>
    ),
  },
];
