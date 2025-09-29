"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <Image
          id="mainImage"
          src={images[currentIndex]}
          alt="Product's image"
          className="w-full h-full object-cover"
          fill={true}
          placeholder="blur"
          blurDataURL={images[0]}
          objectFit="contain"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images?.length > 0 &&
          images?.map((image, index) => (
            <button
              onClick={() => setCurrentIndex(index)}
              key={image}
              className={`aspect-square relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 ${
                currentIndex === index
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt="Product's image"
                className="w-full h-full object-cover"
                fill={true}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
