"use client";

import { useEffect, useState } from "react";

type ImageSliderProps = {
  images: string[];
  alt: string;
};

export default function ImageSlider({
  images,
  alt,
}: ImageSliderProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((current) =>
        current === images.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${alt} ${index + 1}`}
          className={`absolute inset-0 h-300px w-300px object-cover transition-opacity duration-700 ${
            index === activeImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}