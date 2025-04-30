import { Metadata } from "next";

import { auth } from "@/auth";
import { ClearAdminInputSearch } from "@/components/admin";
import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
import { getAllOrders } from "@/lib/actions/order.actions";
import { PAGE_SIZE, userRoles } from "@/lib/constants";

import { tableRows } from "./helpers";

export const metadata: Metadata = {
  title: "Admin Orders",
};

type T_Props = {
  searchParams: Promise<{ page?: string; query?: string }>;
};

const AllOrdersPage = async ({ searchParams }: T_Props) => {
  const session = await auth();

  if (session?.user?.role !== userRoles.ADMIN) {
    throw new Error("User is not authorized.");
  }

  const { page = "1", query = "" } = await searchParams;

  const { data, totalCount, totalPages } = await getAllOrders({
    pageNumber: +page,
    limit: PAGE_SIZE,
    query,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders ({totalCount})</h1>
        <ClearAdminInputSearch query={query} href="/admin/orders" />
      </div>

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
