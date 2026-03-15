"use client";

import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import useCartStore from "@/store/cartStore";

export default function Header() {
  const cartCount = useCartStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="container mx-auto flex items-center justify-between py-1 grid-cols-3">
      <div className="px-4 py-2 w-2/12">
        <Link href="/">
          <Image src="/logo.webp" alt="Logo" width={150} height={150} />
        </Link>
      </div>
      <div className="relative w-7/12">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-santas-gray"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search..."
          className="outline-none  py-5 pl-8 text-md border border-athens-gray"
        />
      </div>
      <div className="w-3/12 px-4 py-2 flex justify-end items-center gap-4s gap-10">

        <Link href="/cart" className="relative">
          <ShoppingCart  size={35} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-md rounded-full h-6 w-6 flex items-center justify-center">
            {cartCount}
          </span>
        </Link>

        <div className="flex justify-center items-center">
          <CircleUserRound
            size={45}
            className="text-santas-gray"
          />
          <Link href="/login" className="flex flex-col">
            <span className="ml-2 text-md text-santas-gray">Login</span>
            <span className="ml-2 text-sm text-santas-gray">Hello Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
