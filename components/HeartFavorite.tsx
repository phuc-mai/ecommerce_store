"use client"

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeartFavorite = ({ product, updateSignedInUser }: { product: ProductType, updateSignedInUser?: (updatedUser: UserType) => void }) => {
  const router = useRouter();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setIsLiked(data.wishlist.includes(product._id));
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        updateSignedInUser && updateSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(product._id));
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };

  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;
