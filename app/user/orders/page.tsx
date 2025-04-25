import { Metadata } from "next";

import Pagination from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserOrders } from "@/lib/actions/order.actions";

import { tableRows } from "./helpers";

export const metadata: Metadata = { title: "My Orders" };

type T_Props = { searchParams: Promise<{ page?: string }> };

const OrdersPage = async ({ searchParams }: T_Props) => {
  const { page } = await searchParams;

  const orders = await getUserOrders({ page: Number(page) || 1 });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders ({orders.totalCount})</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {tableRows.map(({ title }) => (
                <TableHead key={title}>{title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                {tableRows.map(({ title, getCell }) => (
                  <TableCell key={title}>{getCell(order)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex w-full mt-8 justify-center">
          {!!orders.totalPages && (
            <Pagination
              page={Number(page) || 1}
              totalPages={orders.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
