export enum E_AppThemes {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export type T_Product = {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string | null;
};
