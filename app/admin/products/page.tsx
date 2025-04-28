import Link from "next/link";

import AppTable from "@/components/shared/appTable";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";

import { columns } from "./helpers";

type T_Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
  }>;
};

const AdminProductsPage = async ({ searchParams }: T_Props) => {
  const { category = "", page = 1, query = "" } = await searchParams;

  const { data, total, totalPages } = await getAllProducts({
    page: Number(page),
    query,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between border-b pb-2">
        <h1 className="h2-bold">Products({total})</h1>

        <Button asChild>
          <Link href="/admin/product/crate">Add New Product</Link>
        </Button>
      </div>

      <AppTable columns={columns} entities={data} />
      {!!totalPages && (
        <div className="flex-center mt-8">
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};
export default AdminProductsPage;
