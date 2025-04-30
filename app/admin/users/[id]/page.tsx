import { Metadata } from "next";

import { getUserById } from "@/lib/actions/user.actions";

import EditUserAdminForm from "./form";

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
      <h1 className="h2-bold">Update User</h1>
      {!user ? (
        <div className="text-destructive">{`User with ID: ${id} not found`}</div>
      ) : (
        <EditUserAdminForm user={user} />
      )}
    </div>
  );
};
export default AdminUserUpdatePage;
