import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";

import { getFilterUrl, normalizeSearchParams, T_SearchParams } from "./helpers";

type T_Props = {
  searchParams: Promise<T_SearchParams>;
};

const SearchPage = async ({ searchParams }: T_Props) => {
  const originSearchParams = await searchParams;
  const normalisedSearParams = normalizeSearchParams(originSearchParams);

  const { data } = await getAllProducts({
    ...normalisedSearParams,
    query: normalisedSearParams.q,
  });

  console.log(
    "getFilterUrl ===>",
    getFilterUrl({ category: "HOODIE" }, normalisedSearParams)
  );

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/*FILTERS*/}</div>

      <div className="md:col-span-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {!data.length && <div>No Products Found</div>}
          {!!data.length &&
            data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
