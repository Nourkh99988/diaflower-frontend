// import Image from "next/image";
import { fetchFromApi } from "@/lib/api/fetchData";
import { ProductTranslationResponse } from "@/lib/types/prodact";
import { getTranslations } from "next-intl/server";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/i18n/navigation";

// This function generates the static paths for ISR
export async function generateStaticParams() {
  // Fetch the total number of pages from your API
  const response = await fetchFromApi<ProductTranslationResponse>("/products/en");
  const totalPages = response?.pagination?.totalPages || 1;
  const paths = [];

  for (let page = 1; page <= totalPages; page++) {
    paths.push({ productsPage: page.toString() });
  }

  return paths;
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;
export const dynamicParams = true;

interface PaginationButtonProps {
  page: number;
  currentPage: number;
  locale: string;
  isActive?: boolean;
}

function PaginationButton({ page, isActive }: PaginationButtonProps) {
  return (
    <Link
      href={`/${page}`}
      className={`w-10 h-10 flex items-center justify-center rounded-md mx-1 transition-colors ${
        isActive ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
      }`}
    >
      {page}
    </Link>
  );
}

export default async function ProductsPage({ params }: { params: { locale: string; productsPage: string } }) {
  const { locale, productsPage } = params;
  const t = await getTranslations("home");
  const currentPage = parseInt(productsPage, 10);

  const productsResponse = await fetchFromApi<ProductTranslationResponse>(`/products/${locale}?page=${currentPage}`);

  const products = productsResponse?.products || [];
  const pagination = productsResponse?.pagination || { page: 1, totalPages: 1 };

  if (!products.length) {
    return <div className="text-center text-red-600 py-8">{t("noProducts")}</div>;
  }

  // Calculate pagination range
  const range = 2; // Show 2 pages before and after current page
  const pages = [];
  for (let i = Math.max(1, currentPage - range); i <= Math.min(pagination.totalPages, currentPage + range); i++) {
    pages.push(i);
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {/* First page */}
        {currentPage > range + 1 && (
          <>
            <PaginationButton page={1} currentPage={currentPage} locale={locale} />
            {currentPage > range + 2 && <span className="mx-2">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <PaginationButton
            key={page}
            page={page}
            currentPage={currentPage}
            locale={locale}
            isActive={page === currentPage}
          />
        ))}

        {/* Last page */}
        {currentPage < pagination.totalPages - range && (
          <>
            {currentPage < pagination.totalPages - range - 1 && <span className="mx-2">...</span>}
            <PaginationButton page={pagination.totalPages} currentPage={currentPage} locale={locale} />
          </>
        )}
      </div>
    </div>
  );
}
