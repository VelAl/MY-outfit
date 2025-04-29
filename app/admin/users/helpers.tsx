import { T_Columns, T_User } from "@/app-types-ts";
import { ViewItemLink } from "@/components/shared/view-item-link";
import { Badge } from "@/components/ui/badge";
import { userRoles } from "@/lib/constants";
import { formatId } from "@/lib/utils";

export const columns: T_Columns<T_User> = [
  {
    title: "ID",
    getCell: ({ id }) => formatId(id),
  },
  {
    title: "NAME",
    getCell: ({ name }) => name,
  },
  {
    title: "EMAIL",
    getCell: ({ email }) => email,
  },
  {
    title: "ROLE",
    getCell: ({ role }) => (
      <Badge variant={role === userRoles.ADMIN ? "success" : "secondary"}>
        {role}
      </Badge>
    ),
  },
  {
    title: "",
    classNameHeader: "sticky right-0 bg-background z-10",
    classNameCell:
      "sticky right-0 bg-background z-10 flex gap-2 justify-end pr-4 ",
    getCell: ({ id }) => <ViewItemLink href={`/admin/users/${id}`} />,
  },
];
