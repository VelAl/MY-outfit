import { T_Columns, T_Order } from "@/app-types-ts";
import { ViewItemLink } from "@/components/shared/view-item-link";
import { formatDateTime, formatId, formatUSDPrice } from "@/lib/utils";

type T_OrderFromDB = Pick<
  T_Order,
  "id" | "createdAt" | "totalPrice" | "paidAt" | "deliveredAt"
>;

export const tableRows: T_Columns<T_OrderFromDB> = [
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
      <div className="flex justify-end">
        <ViewItemLink href={`/order/${id}`} />
      </div>
    ),
  },
];
