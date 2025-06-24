import { fetchFromApi } from "@/lib/api/fetchData";
import { ProductTranslation } from "@/lib/types/prodact";
import ProductDetails from "@/components/ProductDetails";

export const revalidate = 3600; // cache for 60 minutes

// ISR
export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await params;
  const res = await fetch(`http://localhost:3001/products/${locale}`);
  const data = await res.json();

  return data.products.map((p: { slug: string }) => ({
    productSlug: p.slug,
  }));
}

export default async function page({ params }: { params: Promise<{ locale: string; productSlug: string }> }) {
  const { locale, productSlug } = await params;
  const product = await fetchFromApi<ProductTranslation>(`/products/${locale}/${productSlug}`);

  if (!product) {
    return <div className="text-center text-red-600 py-8">Product not found</div>;
  }

  return <ProductDetails product={product} locale={locale} />;
}
