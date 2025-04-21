"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { T_Cart, T_CartItem } from "@/app-types-ts";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatUSDPrice } from "@/lib/utils";

type T_Props = { cart?: T_Cart };

const CartTable = ({ cart }: T_Props) => {
  const [isPending, startTransition] = useTransition();

  const _add = (item: T_CartItem) =>
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });

  const _remove = (item: T_CartItem) =>
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (res.success) {
        toast.info(res.message);
      } else {
        toast.error(res.message);
      }
    });

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart?.items.length ? (
        <div>
          Cart is empty.{" "}
          <Link href="/product" className="underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>

                      <TableCell className="flex-center gap-2 h-16">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          onClick={() => _remove(item)}
                        >
                          {isPending ? <Spinner /> : <Minus />}
                        </Button>
                        <span className="w-8 text-center">{item.qty}</span>

                        <Button
                          variant="outline"
                          disabled={isPending}
                          onClick={() => _add(item)}
                        >
                          {isPending ? <Spinner /> : <Plus />}
                        </Button>
                      </TableCell>

                      <TableCell className="text-right">
                        {formatUSDPrice(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CartTable;
