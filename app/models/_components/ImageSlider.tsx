"use client";

type ImageSliderProps = {
  images: string[];
  alt: string;
};

export default function ImageSlider({
  images,
  alt,
}: ImageSliderProps) {
  if (!images.length) return null;

  const columns =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : images.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : images.length === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : images.length === 5
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";

  return (
    <div className={`mx-auto grid w-full gap-4 ${columns}`}>
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl"
        >
          <img
            src={image}
            alt={`${alt} ${index + 1}`}
            className="h-[200px] w-[200px] object-contain"
          />
        </div>
      ))}
    </div>
  );
}