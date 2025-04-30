import { Metadata } from "next";

import { ClearAdminInputSearch } from "@/components/admin";
import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
import { getAllUsers } from "@/lib/actions/user.actions";

import { columns } from "./helpers";

export const metadata: Metadata = {
  title: "Admin Users",
};

type T_Props = {
  searchParams: Promise<{ page?: string; query?: string }>;
};

const AdminUsersPage = async ({ searchParams }: T_Props) => {
  const { page, query = "" } = await searchParams;
  const { data, total, totalPages } = await getAllUsers({
    page: Number(page) || 1,
    query,
  });

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Users({total})</h1>
        <ClearAdminInputSearch query={query} href="/admin/users" />
      </div>

      <AppTable entities={data} columns={columns} />
      <div className="mt-4 flex justify-center">
        <Pagination page={page || 1} totalPages={totalPages} />
      </div>
    </div>
  );
};
export default AdminUsersPage;
