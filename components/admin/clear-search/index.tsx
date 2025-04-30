import Link from "next/link";
import { Eraser } from "lucide-react";

type T_Props = {
  query: string;
  href: string;
};

export const ClearAdminInputSearch = ({ query, href }: T_Props) => {
  return (
    <>
      {query && (
        <div className="flex gap-4">
          Filtered by
          <span>
            {"`"}
            <i>{query}</i>
            {"`"}
          </span>
          <Link href={href}>
            <Eraser className="text-primary transition-transform duration-200 hover:scale-130" />
          </Link>
        </div>
      )}
    </>
  );
};
