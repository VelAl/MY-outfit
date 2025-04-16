import { notFound } from "next/navigation";

import ProductPice from "@/components/shared/product/product-pice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";

type I_Props = { params: Promise<{ slug: string }> };

const ProductsDetailsPage = async ({ params }: I_Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* IMAGES COL */}
          <div className="col-span-2"></div>

          {/* DETAILS COL */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                <b>{product.brand}</b> {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPice
                  value={+product.price}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>

            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>

          {/* ACTION COL */}
          <div>
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPice value={+product.price} />
                  </div>
                </div>

                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {product.stock ? (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700"
                    >
                      In stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of stock</Badge>
                  )}
                </div>

                {!!product.stock && (
                  <div className="flex-center">
                    <Button className="w-full mt-2">Add to cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductsDetailsPage;
