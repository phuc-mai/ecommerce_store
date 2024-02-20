"use client"

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { removeAll } = useCart();

  useEffect(() => {
    removeAll();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-heading4-bold text-red-1">Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <Link href="/" className="p-4 border text-base-bold hover:bg-black hover:text-white">CONTINUE TO SHOPPING</Link>
    </div>
  );
};

export default PaymentSuccess;
