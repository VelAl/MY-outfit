import Image from "next/image";
import Link from "next/link";

import { T_Cart, T_Columns } from "@/app-types-ts";
import { formatUSDPrice } from "@/lib/utils";

import AppTable from "../appTable";

type T_Props = {
  items: T_Cart["items"];
};

type T_CartItem = T_Cart["items"][number];

const columns: T_Columns<T_CartItem> = [
  {
    title: "Item",
    getCell: (product) => (
      <Link href={`/product/${product.slug}`} className="flex items-center">
        <Image
          className="rounded-sm"
          src={product.image}
          alt="product image"
          width={50}
          height={50}
        />
        <span className="ml-4 text-wrap">{product.name}</span>
      </Link>
    ),
  },
  {
    title: "Quantity",
    getCell: ({ qty }) => qty,
  },
  {
    title: "Price",
    getCell: ({ price }) => formatUSDPrice(price),
  },
];

const OrderItemsTable = ({ items }: T_Props) => {
  return <AppTable columns={columns} entities={items} keyName="productId" />;
};
export default OrderItemsTable;
