"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { T_Product } from "@/app-types-ts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type T_Props = {
  products: T_Product[];
};
const ProductCarousel = ({ products }: T_Props) => {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {products.map(({ id, slug, banner }) => (
          <CarouselItem key={id}>
            <Link href={`/product/${slug}`}>
              <div className="relative mx-auto h-[200px] overflow-hidden">
                <Image
                  src={banner as string}
                  alt={slug}
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export default ProductCarousel;
