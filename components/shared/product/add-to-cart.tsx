"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { type T_CartItem } from "@/app-types-ts";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";

type I_Props = {
  item: T_CartItem;
};

const AddToCart = ({ item }: I_Props) => {
  const router = useRouter();

  const _addToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    } else {
      toast.success("Success!", {
        description: res.message,

        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      });
    }
  };

  return (
    <div className="w-full ">
      <Button className="w-full mt-2" type="button" onClick={_addToCart}>
        <Plus /> Add to cart
      </Button>
    </div>
  );
};
export default AddToCart;
