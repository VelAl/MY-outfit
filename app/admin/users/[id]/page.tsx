import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Update User",
};

type T_Props = {
  params: Promise<{ id: string }>;
};

const AdminUserUpdatePage = async ({ params }: T_Props) => {
  const { id } = await params;
  const user = await getUserById(id);

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <h1 className="h2-bold">Updata User</h1>
    </div>
  );
};
export default AdminUserUpdatePage;
