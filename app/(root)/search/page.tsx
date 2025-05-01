import { Metadata } from "next";
import Link from "next/link";

import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";

import {
  getFilterUrl,
  normalizeSearchParams,
  priceRanges,
  ratings,
  sortOrders,
  T_SearchParams,
} from "./helpers";
import SelectedFilters from "./selected-filters";

export const metaData: Metadata = {
  title: "Search",
};

type T_Props = {
  searchParams: Promise<T_SearchParams>;
};

const SearchPage = async ({ searchParams }: T_Props) => {
  const originSearchParams = await searchParams;
  const normalisedSearchParams = normalizeSearchParams(originSearchParams);
  const { category, price, rating, sort } = normalisedSearchParams;

  const categories = await getAllCategories();
  const { data } = await getAllProducts({
    ...normalisedSearchParams,
    query: normalisedSearchParams.q,
  });

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      {/* ASIDE FILTERS */}
      <div className="filter-links">
        {/* CATEGORY */}
        <div>
          <div className="text-xl font-bold mt-3 border-b">Category</div>
          <ul>
            <li className="pl-2">
              <Link
                href={getFilterUrl({ category: "all" }, normalisedSearchParams)}
                className={`${
                  (category === "all" || !category) &&
                  "text-primary font-bold pointer-events-none"
                } block w-full hover:bg-secondary rounded`}
              >
                All
              </Link>
            </li>
            {categories.map(({ category: c }) => (
              <li key={c} className="pl-2 w-full">
                <Link
                  href={getFilterUrl({ category: c }, normalisedSearchParams)}
                  className={`${
                    c === category &&
                    "text-primary font-bold pointer-events-none"
                  } block w-full hover:bg-secondary rounded`}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PRICE */}
        <div>
          <div className="text-xl font-bold mt-3 border-b">Price</div>
          <ul>
            <li className="pl-2">
              <Link
                href={getFilterUrl({ price: "all" }, normalisedSearchParams)}
                className={`${
                  (price === "all" || !price) &&
                  "text-primary font-bold pointer-events-none"
                } block w-full hover:bg-secondary rounded`}
              >
                All
              </Link>
            </li>
            {priceRanges.map(([from, to], i) => (
              <ul key={i} className="spase-y-1">
                <li className="pl-2 w-full">
                  <Link
                    href={getFilterUrl(
                      { price: `${from}-${to}` },
                      normalisedSearchParams
                    )}
                    className={`${
                      price === `${from}-${to}` &&
                      "text-primary font-bold pointer-events-none"
                    } block w-full hover:bg-secondary rounded`}
                  >
                    {`from $${from} to $${to}`}
                  </Link>
                </li>
              </ul>
            ))}
          </ul>
        </div>

        {/* RATING */}
        <div>
          <div className="text-xl font-bold mt-3 border-b">Rating</div>
          <ul>
            <li className="pl-2">
              <Link
                href={getFilterUrl({ rating: "all" }, normalisedSearchParams)}
                className={`${
                  (rating === "all" || !rating) &&
                  "text-primary font-bold pointer-events-none"
                } block w-full hover:bg-secondary rounded`}
              >
                All
              </Link>
            </li>
            {ratings.map((rate) => (
              <ul key={rate} className="spase-y-1">
                <li className="pl-2 w-full">
                  <Link
                    href={getFilterUrl(
                      { rating: rate },
                      normalisedSearchParams
                    )}
                    className={`${
                      rating === rate &&
                      "text-primary font-bold pointer-events-none"
                    } block w-full hover:bg-secondary rounded`}
                  >
                    {`${rate} stars & UP`}
                  </Link>
                </li>
              </ul>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className="flex-between my-4  ">
          <SelectedFilters searchParams={normalisedSearchParams} />

          <div>
            <span className="text-nowrap">Sort by: </span>
            {sortOrders.map((s) => (
              <Link
                key={s}
                href={getFilterUrl({ sort: s }, normalisedSearchParams)}
                className={`mx-1 hover:bg-secondary ${
                  sort === s && "font-bold text-primary pointer-events-none"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

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
