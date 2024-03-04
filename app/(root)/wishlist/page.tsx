"use client";

import { getProductDetails } from "@/actions/actions";
import Product from "@/components/Product";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlist = async () => {
    setLoading(true);

    if (!signedInUser) return;

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  }

  useEffect(() => {
    getWishlist();
  }, [signedInUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && (
        <p className="text-body-bold">No items in your wishlist</p>
      )}
      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <Product key={product._id} product={product} updateSignedInUser={updateSignedInUser} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

