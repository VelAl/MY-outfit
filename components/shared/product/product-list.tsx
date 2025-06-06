import { FC } from "react";

import { T_Product } from "@/app-types-ts";

import ProductCard from "./product-card";

type I_Props = {
  data: T_Product[];
  title?: string;
};

const ProductList: FC<I_Props> = ({ data, title }) => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>

      {!!data.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products yet</p>
        </div>
      )}
    </div>
  );
};
export default ProductList;
