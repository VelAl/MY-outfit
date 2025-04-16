"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type I_Props = {
  images: string[];
};

const ProductImages = ({ images }: I_Props) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="Product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center rounded"
      />

      <div className="flex">
        {images.map((img, i) => (
          <div
            key={img}
            onClick={() => setCurrent(i)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-green-600",
              i === current && "border-green-500 pointer-events-none"
            )}
          >
            <Image src={images[i]} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;
