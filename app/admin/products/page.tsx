import Link from "next/link";
import { Eraser, Plus } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <h1 className="h2-bold">Products({total})</h1>
          {query && (
            <div className="flex gap-4">
              Filtered by
              <span>
                {"`"}
                <i>{query}</i>
                {"`"}
              </span>
              <Link href="/admin/products">
                <Eraser className="text-primary transition-transform duration-200 hover:scale-130" />
              </Link>
            </div>
          )}
        </div>

        <Button asChild>
          <Link href="/admin/products/create">
            <Plus /> Add New
          </Link>
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
