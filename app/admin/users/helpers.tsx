import { T_Columns, T_User } from "@/app-types-ts";
import { formatId } from "@/lib/utils";

export const columns: T_Columns<T_User> = [
  {
    title: "ID",
    getCell: ({ id }) => formatId(id),
  },
];
