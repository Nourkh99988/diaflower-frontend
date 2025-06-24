import { Link } from "@/i18n/navigation";
import { ProductTranslation } from "@/lib/types/prodact";

interface ProductCardProps {
  product: ProductTranslation;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Link
      href={`product/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/*  Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <span className="text-7xl transition-transform duration-300 group-hover:scale-110">🖼️</span> */}
        </div>
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {locale === "ar" ? "جديد" : "NEW"}
        </div>
      </div>

      {/*  product detailes */}
      <div className="flex flex-col flex-grow p-4">
        <h2 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold text-blue-600">${product.product?.price}</span>
            {product.product?.price > 100 && (
              <span className="ml-2 text-xs text-gray-500 line-through">
                ${(product.product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          {/*  arrow */}
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 transform group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
