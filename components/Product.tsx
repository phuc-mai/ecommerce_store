"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

const Product = ({
  product,
  updateSignedInUser,
}: {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}) => {
  return (
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
        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default Product;
