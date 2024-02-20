import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToastProvider from "@/lib/providers/ToastProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxira",
  description: "Next.js 14 Ecommerce Store Luxira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToastProvider />
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
