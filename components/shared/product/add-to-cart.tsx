"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { T_Cart, type T_CartItem } from "@/app-types-ts";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

type I_Props = {
  item: T_CartItem;
  cart?: T_Cart;
};

const AddToCart = ({ cart, item }: I_Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const _handleChange = async (isAdd: boolean) => {
    startTransition(async () => {
      const res = isAdd
        ? await addItemToCart(item)
        : await removeItemFromCart(item.productId);

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
    });
  };

  // check if item is in cart
  const exist = cart?.items.find(
    ({ productId }) => productId === item.productId
  );

  return (
    <div className="w-full flex justify-center items-center mt-2">
      {exist ? (
        <>
          <Button
            className="grow"
            disabled={isPending}
            onClick={() => _handleChange(false)}
          >
            {isPending ? <Spinner /> : <Minus />}
          </Button>
          <div className="mx-4">{exist.qty}</div>
          <Button
            className="grow"
            disabled={isPending}
            onClick={() => _handleChange(true)}
          >
            {isPending ? <Spinner /> : <Plus />}
          </Button>
        </>
      ) : (
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() => _handleChange(true)}
        >
          {isPending ? <Spinner /> : <Plus />}
          Add to cart
        </Button>
      )}
    </div>
  );
};
export default AddToCart;
