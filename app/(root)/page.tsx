import ProductList from "@/components/shared/product";
import { sampleData } from "@/db/sample-data";

const HomePage = () => {
  return (
    <>
      <ProductList data={sampleData.products} title="Newest Arrivals" />
    </>
  );
};
export default HomePage;
