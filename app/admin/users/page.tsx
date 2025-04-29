import { Metadata } from "next";

import AppTable from "@/components/shared/appTable";
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
      <AppTable entities={data} columns={columns} />
    </div>
  );
};
export default AdminUsersPage;
