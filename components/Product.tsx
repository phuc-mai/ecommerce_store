"use client";

import { useSession } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "./Loader";

const Product = ({ product }: { product: ProductType }) => {
  const { session } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setUser(data);
      setIsFavorite(data?.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("user_GET", error);
    }
  };

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  const router = useRouter();

  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({
            favoriteItem: product._id,
          }),
        });
        const updatedUser = await res.json();
        setIsFavorite(updatedUser.wishlist.includes(product._id));
      }
    } catch (error) {
      console.log("user_wishlist_POST", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2 cursor-pointer"
    >
      <Image
        key={product._id}
        src={product.media[0]}
        width={250}
        height={300}
        alt="product"
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <button onClick={handleFavorite}>
          <Heart fill={`${isFavorite ? "red" : "white" }`}/>
        </button>
      </div>
    </Link>
  );
};

export default Product;
