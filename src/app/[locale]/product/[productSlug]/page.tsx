import { fetchFromApi } from "@/lib/api/fetchData";
import { ProductTranslation } from "@/lib/types/prodact";
import { getTranslations } from "next-intl/server";
import ProductDetails from "@/components/ProductDetails";

export const dynamic = "force-static";

export default async function page({ params }: { params: Promise<{ locale: string; productSlug: string }> }) {
  const { locale, productSlug } = await params;
  const product = await fetchFromApi<ProductTranslation>(`/products/${locale}/${productSlug}`);

  if (!product) {
    return <div className="text-center text-red-600 py-8">Product not found</div>;
  }
  const t = await getTranslations("product");

  return <ProductDetails product={product} locale={locale} />;
}
