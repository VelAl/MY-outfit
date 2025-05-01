import Link from "next/link";
import { Eraser } from "lucide-react";

import { clearParam, T_NormalizedSearchParams } from "./helpers";

const _checkValue = (value: string) => !!value && value !== "all";

const selectedFiltersArr: {
  title: string;
  key: keyof T_NormalizedSearchParams;
  construct: (params: T_NormalizedSearchParams) => React.ReactNode;
}[] = [
  {
    title: "Query",
    key: "q",
    construct: ({ q }) => (
      <>
        `<i>{q}</i>`
      </>
    ),
  },
  {
    title: "Category",
    key: "category",
    construct: ({ category }) => category,
  },
  {
    title: "Price",
    key: "price",
    construct: ({ price }) =>
      `$${price.split("-")[0]} - $${price.split("-")[1]}`,
  },
  {
    title: "Rating",
    key: "rating",
    construct: ({ rating }) => `${rating} stars & UP`,
  },
] as const;

const SelectedFilters = ({
  searchParams,
}: {
  searchParams: T_NormalizedSearchParams;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-3 text-gray-400">
      {selectedFiltersArr.map(
        ({ construct, key, title }) =>
          _checkValue(searchParams[key]) && (
            <div key={key} className="flex">
              {title}:
              <span className="text-foreground text-nowrap">
                {construct(searchParams)}
              </span>
              <Link href={clearParam(key, searchParams)}>
                <Eraser className="ml-1 text-primary transition-transform duration-200 hover:scale-130" />
              </Link>
              ;
            </div>
          )
      )}
    </div>
  );
};
export default SelectedFilters;
