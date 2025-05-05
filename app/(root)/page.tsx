import IconBoxes from "@/components/shared/icon-boxes";
import { ProductList } from "@/components/shared/product";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsLink from "@/components/shared/view-all-products-link";
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
      <ViewAllProductsLink />
      <IconBoxes />
    </>
  );
};
export default HomePage;
