import ProductList from "@/components/shared/product";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </>
  );
};
export default HomePage;
