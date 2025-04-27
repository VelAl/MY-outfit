import { Metadata } from "next";

import { auth } from "@/auth";
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

  const {data} = await getAllOrders({ pageNumber: +page, limit: PAGE_SIZE });

  console.log('orders ===>', data);

  return <div>page</div>;
};
export default AllOrdersPage;
