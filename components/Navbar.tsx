"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cart = useCart();
  const { user } = useUser();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/orders", label: "Orders" },
  ];

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white">
      <Link href="/">
        <Image src="/logo.png" width={130} height={50} alt="logo" />
      </Link>

      <div className="flex gap-4 max-lg:hidden">
        {navLinks.map((link) => (
          <Link href={link.href} className={`text-base-bold hover:text-red-1 ${pathname === link.href && "text-red-1"}`}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-5 px-3 py-1 border border-grey-2 rounded-lg">
        <input
          className="outline-none"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      <div className="relative flex items-center gap-3">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute flex flex-col gap-4 p-3 rounded-lg top-12 right-5 bg-white border text-base-bold">
            <Link href="/" className="hover:text-red-1">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-red-1"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-red-1"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound className="text-grey-2 h-9 w-9" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
