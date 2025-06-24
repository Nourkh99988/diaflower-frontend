"use client";
import { useState } from "react";
import { ProductTranslation } from "@/lib/types/prodact";
import { useTranslations } from "next-intl";

interface ProductDetailsProps {
  product: ProductTranslation;
  locale: string;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const sizes = product.product.variations.filter((v) => v.type === "size").map((v) => v.value);
  const colors = product.product.variations.filter((v) => v.type === "color").map((v) => v.value);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const t = useTranslations("product");

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/*Image*/}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg h-64 mb-4 md:mb-0"></div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2 text-blue-600">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-lg font-semibold text-blue-600">{product.product.price} $</span>
          </div>
          {/* size */}
          {sizes.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">{t("size") || "الحجم"}</label>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-bold transition ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* color */}
          {colors.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">{t("color") || "اللون"}</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${
                      selectedColor === color ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <span className="block w-3 h-3 bg-white rounded-full border border-blue-600"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
