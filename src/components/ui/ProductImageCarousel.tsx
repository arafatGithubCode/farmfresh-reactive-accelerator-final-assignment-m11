"use client";

import Image from "next/image";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProductImageCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<string>("");

  if (!images || images.length === 0) {
    return (
      <Image
        src=""
        alt="No product image available"
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        width={200}
        height={200}
      />
    );
  }

  const handlePrev = () => {
    setAnimation("animate-fade-left");
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAnimation("animate-fade-right");
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <GrFormPrevious
        aria-label="Previous Image"
        onClick={handlePrev}
        className="absolute top-1/2 -translate-y-1/2 left-0 bg-primary-500 rounded-full text-white text-xl group-hover:block cursor-pointer hover:bg-primary-700 duration-200"
      />
      <Image
        key={images[index]}
        src={images[index]}
        alt="Fresh Tomatoes"
        className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${animation}`}
        width={200}
        height={200}
        onAnimationEnd={() => setAnimation("")}
      />

      <GrFormNext
        aria-label="Next Image"
        onClick={handleNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 bg-primary-500 rounded-full text-white text-xl cursor-pointer hover:bg-primary-700 duration-200"
      />
    </>
  );
};

export default ProductImageCarousel;
