"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const cart = useCart();
  const { user } = useUser();

  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href="/">
        <Image src="/logo.png" width={130} height={50} alt="logo" />
      </Link>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="relative flex items-center gap-3">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        {user && (
          <Menu
            className="cursor-pointer"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />
        )}

        {dropdownMenu && user && (
          <div className="absolute flex flex-col gap-2 p-3 rounded-lg top-10 right-5 bg-white border text-base-bold">
            <Link href="/wishlist" className="hover:text-red-1">
              Wishlist
            </Link>
            <Link href="/order" className="hover:text-red-1">
              Order
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound className="text-grey-2 h-9 w-9"/>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
