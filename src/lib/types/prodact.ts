export type Variation = {
  id: number;
  type: "size" | "color"; // أو string لو غير متأكد
  value: string;
};

export type Product = {
  id: number;
  price: number;
  variations: Variation[];
};

export type ProductTranslation = {
  id: number;
  locale: "en" | "ar"; // أو string لو مش محصور
  slug: string;
  name: string;
  description: string;
  product: Product;
};

export type ProductTranslationResponse = {
  products: ProductTranslation[];
  pagination: {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
};
