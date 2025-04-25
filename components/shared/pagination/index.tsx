"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

type T_Props = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName = "page" }: T_Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const _handleClick = (type: "next" | "prev") => {
    const pageVal = +page + (type === "next" ? 1 : -1);

    const newUrl = formUrlQuery({
      key: urlParamName,
      params: params.toString(),
      value: `${pageVal}`,
    });

    router.push(newUrl);
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={+page === 1}
        onClick={() => _handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={+page >= totalPages}
        onClick={() => _handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
