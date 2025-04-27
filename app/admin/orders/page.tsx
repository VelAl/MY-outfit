import { Metadata } from "next";

import { tableRows } from "@/app/user/orders/helpers";
import { auth } from "@/auth";
import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
import { getAllOrders } from "@/lib/actions/order.actions";
import { PAGE_SIZE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin Orders",
};

type T_Props = {
  searchParams: Promise<{ page?: string }>;
};

const AllOrdersPage = async ({ searchParams }: T_Props) => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized.");
  }

  const { page = "1" } = await searchParams;

  const { data, totalCount, totalPages } = await getAllOrders({
    pageNumber: +page,
    limit: PAGE_SIZE,
  });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders ({totalCount})</h2>
      <div className="overflow-x-auto">
        <AppTable columns={tableRows} entities={data} />

        <div className="flex w-full mt-8 justify-center">
          {!!totalPages && (
            <Pagination page={Number(page) || 1} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;
