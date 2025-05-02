import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { AddToCart, ProductImages } from "@/components/shared/product";
import ProductPrice from "@/components/shared/product/product-price";
import Rating from "@/components/shared/product/rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getProductBySlug } from "@/lib/actions/product.actions";

import ReviewList from "./review-list";

type I_Props = { params: Promise<{ slug: string }> };

const ProductsDetailsPage = async ({ params }: I_Props) => {
  const session = await auth();
  const { slug } = await params;
  const userId = session?.user?.id;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const cart = await getMyCart();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* IMAGES COL */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>

          {/* DETAILS COL */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                <b>{product.brand}</b> {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>

              <Rating value={+product.rating} />
              <p>{product.numReviews} reviews</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
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
                    <ProductPrice value={+product.price} />
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
                    <AddToCart
                      cart={cart}
                      item={{
                        image: product.images![0],
                        name: product.name,
                        price: product.price,
                        productId: product.id,
                        qty: 1,
                        slug: product.slug,
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="h2-bold">Reviews</h2>

        <ReviewList
          productId={product.id}
          productSlug={slug}
          userId={userId || ""}
        />
      </section>
    </>
  );
};
export default ProductsDetailsPage;
