"use client";

import useCart from "@/lib/hooks/useCart";
import { Heart, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

const ProductInfo = ({ productDetails }: { productDetails: ProductType }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productDetails.title}</p>
        <Heart
          fill={`${isFavorite ? "red" : "white"}`}
          className="cursor-pointer"
          onClick={() => setIsFavorite(!isFavorite)}
        />
      </div>

      <div className="flex gap-2">
        <p className="text-grey-2 text-base-medium">Category:</p>
        <p className="text-base-bold">{productDetails.category}</p>
      </div>

      <p className="text-heading3-bold">$ {productDetails.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-grey-2 text-base-medium">Description:</p>
        <p className="text-small-medium">{productDetails.description}</p>
      </div>

      {productDetails.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-grey-2 text-base-medium">Color:</p>
          <div className="flex gap-2">
            {productDetails.colors.map((color: string) => (
              <p
                key={color}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productDetails.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-grey-2 text-base-medium">Sizes:</p>
          <div className="flex gap-2">
            {productDetails.sizes.map((size: string) => (
              <p
                key={size}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-grey-2 text-base-medium">Quanity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="outline text-base-bold py-3 rounded-lg hover:text-white hover:bg-black"
        onClick={() =>
          cart.addItem({ item: productDetails, quantity, color: selectedColor, size: selectedSize })
        }
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
