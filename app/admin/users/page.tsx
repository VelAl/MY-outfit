import { Metadata } from "next";

import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
import { getAllUsers } from "@/lib/actions/user.actions";

import { columns } from "./helpers";

export const metadata: Metadata = {
  title: "Admin Users",
};

type T_Props = {
  searchParams: Promise<{ page?: string }>;
};

const AdminUsersPage = async ({ searchParams }: T_Props) => {
  const { page } = await searchParams;
  const { data, total, totalPages } = await getAllUsers({
    page: Number(page) || 1,
  });

  return (
    <div>
      <h2 className="h2-bold">Users({total})</h2>
      <AppTable entities={data} columns={columns} />
      <div className="mt-4 flex justify-center">
        <Pagination page={page || 1} totalPages={totalPages} />
      </div>
    </div>
  );
};
export default AdminUsersPage;
