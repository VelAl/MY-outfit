import Image from "next/image";
import Link from "next/link";

import { T_Cart } from "@/app-types-ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatUSDPrice } from "@/lib/utils";

type T_Props = {
  items: T_Cart["items"];
};

const OrderItemsTable = ({ items }: T_Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((product) => (
          <TableRow key={product.productId}>
            <TableCell>
              <Link
                href={`/product/${product.slug}`}
                className="flex items-center"
              >
                <Image
                  className="rounded-sm"
                  src={product.image}
                  alt="product image"
                  width={50}
                  height={50}
                />
                <span className="ml-4 text-wrap">{product.name}</span>
              </Link>
            </TableCell>

            <TableCell className="pl-8">{product.qty}</TableCell>
            <TableCell className="text-right">
              {formatUSDPrice(product.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default OrderItemsTable;
