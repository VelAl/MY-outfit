import ProductList from "@/components/shared/product";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const products = await getLatestProducts();

  return (
    <>
      <ProductList data={products} title="Newest Arrivals" />
    </>
  );
};
export default HomePage;
