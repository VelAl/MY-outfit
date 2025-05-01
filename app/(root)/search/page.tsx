import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";

type T_Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
};

const SearchPage = async ({ searchParams }: T_Props) => {
  const {
    category = "all",
    page = "1",
    price = "all",
    q = "all",
    rating = "all",
    sort = "newest",
  } = await searchParams;

  const { data } = await getAllProducts({
    page,
    query: q,
    category,
    price,
    rating,
    sort,
  });

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
