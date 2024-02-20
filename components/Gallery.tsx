"use client"

import { useState } from "react";

const Gallery = ({ productImages }: { productImages: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(productImages[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <img
        src={selectedImage}
        alt="product-image"
        className="rounded-lg shadow-xl w-96 h-96 object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productImages.map((image) => (
          <img
            key={image}
            src={image}
            alt="product-image"
            className={`rounded-lg w-20 h-20 object-cover cursor-pointer ${selectedImage === image ? "border-2 border-black" : ""}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
