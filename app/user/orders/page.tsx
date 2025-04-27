import { Metadata } from "next";

import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
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
        <AppTable columns={tableRows} entities={orders.data} />

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
