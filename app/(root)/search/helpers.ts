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

// Construct filter url
export const getFilterUrl = (
  newParams: Omit<T_SearchParams, "q">,
  prevParams: ReturnType<typeof normalizeSearchParams>
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
