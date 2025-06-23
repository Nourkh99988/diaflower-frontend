import { Link } from "@/i18n/navigation";
import { ProductTranslation } from "@/lib/types/prodact";

interface ProductCardProps {
  product: ProductTranslation;
  locale: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block border rounded-lg shadow hover:shadow-lg transition overflow-hidden group bg-white"
    >
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        {/* صورة افتراضية */}
        <span className="text-gray-300 text-6xl">🖼️</span>
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <span className="text-blue-600 font-bold">{product.product?.price} $</span>
      </div>
    </Link>
  );
}
