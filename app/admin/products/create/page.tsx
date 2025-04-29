import { Metadata } from "next";

import { NewProductForm } from "@/components/admin";

export const metadata: Metadata = {
  title: "New Product",
};

const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <NewProductForm type="Create" />
      </div>
    </>
  );
};
export default CreateProductPage;
