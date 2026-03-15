"use client";

import useCartStore from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const {
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCartStore();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">
            Add a few products and they will appear here.
          </p>
          <Button asChild className="mt-6 bg-teal-700 hover:bg-teal-800">
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping cart</h1>
          <p className="mt-2 text-gray-600">
            {cartItems.length} item{cartItems.length > 1 ? "s" : ""} in your cart
          </p>
        </div>
        <Button
          variant="outline"
          className="hover:cursor-pointer"
          onClick={clearCart}
        >
          Clear cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-lg sm:flex-row sm:items-center"
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="h-24 w-24 object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0 hover:cursor-pointer"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <span className="min-w-8 text-center text-lg font-semibold">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0 hover:cursor-pointer"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </Button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  className="mt-2 text-sm font-medium text-red-500 hover:cursor-pointer hover:text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Order summary</h2>
          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t pt-4 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Button className="mt-6 w-full bg-teal-700 py-6 text-base hover:bg-teal-800">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
