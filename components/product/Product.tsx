"use client";

import type { Product } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";

export default function Product({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-2xl flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            className="h-48 object-contain "
            width={200}
            height={200}
          />
        </div>
        {/* Title */}
        <h2 className="text-xl font-semibold mt-5 text-gray-800">
          { product.name }
        </h2>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <Button
            className="flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-full font-semibold hover:cursor-pointer"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      </div>
  );
}
