import { Metadata } from "next";

import { getMyCart } from "@/lib/actions/cart.actions";

import CartTable from "./cart-table";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};
export default CartPage;
