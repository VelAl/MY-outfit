import { T_Columns } from "@/app-types-ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type T_Props<T> = {
  columns: T_Columns<T>;
  entities: T[];
  keyName?: keyof T;
};

function AppTable<T extends Record<string, unknown>>({
  columns,
  entities,
  keyName = "id", //name of property with unique identifier used as key in the TableRow component
}: T_Props<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ title, classNameHeader }) => (
            <TableHead className={classNameHeader} key={title}>
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {entities.map((entity) => (
          <TableRow key={`${entity[keyName]}`}>
            {columns.map(({ getCell, title, classNameCell }) => (
              <TableCell className={classNameCell} key={title}>
                {getCell(entity)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AppTable;
