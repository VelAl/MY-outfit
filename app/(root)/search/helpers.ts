export type T_SearchParams = Partial<
  Record<"q" | "category" | "price" | "rating" | "sort" | "page", string>
>;

export const normalizeSearchParams = (params: T_SearchParams) => ({
  category: params.category ?? "all",
  page: params.page ?? "1",
  price: params.price ?? "all",
  q: params.q ?? "all", // query
  rating: params.rating ?? "all",
  sort: params.sort ?? "newest",
});
export type T_NormalizedSearchParams = ReturnType<typeof normalizeSearchParams>;

// Construct filter url
export const getFilterUrl = (
  newParams: T_SearchParams,
  prevParams: T_NormalizedSearchParams
) => {
  const params = {
    category: newParams.category || prevParams.category,
    page: newParams.page || prevParams.page,
    price: newParams.price || prevParams.price,
    q: prevParams.q, // query
    rating: newParams.rating || prevParams.rating,
    sort: newParams.sort || prevParams.sort,
  };

  return `/search?${new URLSearchParams(params)}`;
};

// Construct filter url with cleared param
export const clearParam = (
  key: keyof T_NormalizedSearchParams,
  params: T_NormalizedSearchParams
) => {
  const withCleared = {
    ...params,
    [key]: "",
  };

  return `/search?${new URLSearchParams(withCleared)}`;
};

export const priceRanges = [
  [1, 30],
  [30, 50],
  [50, 100],
  [100, 500],
  [500, 1000],
] as const;

export const ratings = ["4", "3", "2", "1"] as const;

export const sortOrders = ["newest", "lowest", "highest", "rating"] as const;
