"use client";

import Link from "next/link";

import { T_Cart } from "@/app-types-ts";

type T_Props = { cart?: T_Cart };

const CartTable = ({ cart }: T_Props) => {
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
            <div className="overflow-x-auto md:col-span-3">Tabel</div>
          </div>
        </>
      )}
    </>
  );
};
export default CartTable;
