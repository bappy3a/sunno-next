"use client";

import { create } from "zustand";
import type { Product } from "@/types/products";

export type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),
  decreaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.flatMap((item) => {
        if (item.id !== productId) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    })),
  increaseQuantity: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
