import { ProductList } from "@/components/shared/product";
import ProductCarousel from "@/components/shared/product/product-carousel";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const HomePage = async () => {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {!!featuredProducts.length && (
        <ProductCarousel products={featuredProducts} />
      )}
      <ProductList data={products} title="Newest Arrivals" />
    </>
  );
};
export default HomePage;
