import { FC } from "react";

import { T_Product } from "@/lib/appTypes";

type I_Props = {
  data: T_Product[];
  title?: string;
  limit?: number;
};

const ProductList: FC<I_Props> = ({ data, title, limit }) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>

      {data.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product, i) => (
            <div key={i}>{product.name}</div>
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
