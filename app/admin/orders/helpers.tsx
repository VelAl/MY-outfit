import { ReactNode } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { T_Order } from "@/app-types-ts";
import DeleteDialog from "@/components/shared/delete-dialog";
import { deleteOrder } from "@/lib/actions/order.actions";
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
      <div className="flex gap-4 justify-end text-primary">
        <DeleteDialog id={id} action={deleteOrder} />

        <Link href={`/order/${id}`}>
          <Eye className="transition-transform duration-200 hover:scale-120" />
        </Link>
      </div>
    ),
  },
];
