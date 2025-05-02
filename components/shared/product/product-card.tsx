import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { T_Product } from "@/app-types-ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ProductPice from "./product-pice";
import Rating from "./rating";

type I_Props = {
  product: T_Product;
};

const ProductCard: FC<I_Props> = ({ product }) => {
  return (
    <Card className="w-full max-w-sm bg-muted">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`} className="m-4">
          <Image
            className="rounded-sm"
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-4 h-full">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`} className="flex-grow-1">
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4 h-8 border-t-2">
          <Rating value={+product.rating} />

          {!!product.stock ? (
            <ProductPice value={+product.price} />
          ) : (
            <p className="text-destructive">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
