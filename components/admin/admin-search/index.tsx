"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export const AdminSearch = () => {
  const pathName = usePathname();
  const formActionUrl = pathName.split("/").slice(0, 3).join("/");

  const searchParams = useSearchParams();
  const [queryVal, setQueryVal] = useState(searchParams.get("query") || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setQueryVal(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET" className="relative">
      <Input
        value={queryVal}
        name="query"
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px] pr-10"
        onChange={(e) => {
          setQueryVal(e.target.value);
          setIsDirty(searchParams.get("query") !== e.target.value);
        }}
      />
      <button type="submit" className="absolute right-2 top-[6px]">
        <Search
          className={`text-gray-400 ${
            isDirty &&
            "cursor-pointer text-primary transition-transform duration-200 hover:scale-130"
          }`}
        />
      </button>
    </form>
  );
};
