import Link from "next/link";
import { Pencil } from "lucide-react";

import { T_Columns, T_Product } from "@/app-types-ts";
import { formatId, formatUSDPrice } from "@/lib/utils";

export const columns: T_Columns<T_Product> = [
  { title: "ID", getCell: ({ id }) => formatId(id) },
  { title: "Name", getCell: ({ name }) => name },
  {
    title: "PRICE",
    getCell: ({ price }) => formatUSDPrice(price),
    classNameHeader: "text-end pr-8",
    classNameCell: "text-end pr-8",
  },
  { title: "CATEGORY", getCell: ({ category }) => category },
  { title: "STOK", getCell: ({ stock }) => stock },
  { title: "RATING", getCell: ({ rating }) => rating },
  {
    title: "",
    classNameHeader: "sticky right-0 bg-background z-10",
    classNameCell: "sticky right-0 bg-background z-10 flex justify-end pr-4",
    getCell: ({ id }) => (
      <Link href={`/admin/products/${id}`}>
        <Pencil className="w-5 text-primary transition-transform duration-200 hover:scale-120" />
      </Link>
    ),
  },
];
