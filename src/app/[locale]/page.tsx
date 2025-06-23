// import Image from "next/image";
import { fetchFromApi } from "@/lib/api/fetchData";
import { ProductTranslationResponse } from "@/lib/types/prodact";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/i18n/navigation";

// const getData = async ({ lang }: { lang: string }) => {
//   try {
//     const res = await fetch(`http://localhost:3001/products/${lang}`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data for language: ${lang}`);
//     }
//     return await res.json();
//   } catch (error) {
//     console.error(`Error fetching data for language ${lang}:`, error);
//     return null;
//   }
// };

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const productsResponse = await fetchFromApi<ProductTranslationResponse>(`/products/${locale}`);
  const products = productsResponse?.products || [];
  const pagination = productsResponse?.pagination;

  if (!products.length) {
    return <div className="text-center text-red-600 py-8">{t("noProducts")}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
      {pagination && pagination.page < pagination.totalPages && (
        <div className="flex justify-center mt-4">
          <Link
            href={`/${locale}/2`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {t("seeMore")}
          </Link>
        </div>
      )}
    </div>
  );
}
