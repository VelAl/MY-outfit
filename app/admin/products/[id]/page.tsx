import { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewProductForm } from "@/components/admin";
import { getProductByID } from "@/lib/actions/product.actions";

export const metadata: Metadata = {
  title: "Update Product",
};

type T_Props = {
  params: Promise<{ id: string }>;
};

const AdminProductUpdPage = async ({ params }: T_Props) => {
  const { id } = await params;
  const product = await getProductByID(id);
  if (!product) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h1 className="h2-bold">Update Product</h1>

      <NewProductForm type="Update" product={product} />
    </div>
  );
};
export default AdminProductUpdPage;
