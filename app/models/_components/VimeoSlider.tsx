"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

const MAX_VISIBLE_DOTS = 12;

type VideoSlide = {
  url: string;
  title: string;
};

type VimeoSliderProps = {
  videos: VideoSlide[];
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
  dark?: boolean;
};

function getDotCount(totalSlides: number): number {
  return Math.max(1, Math.min(MAX_VISIBLE_DOTS, totalSlides));
}

function getDotSlideIndex(
  dotIndex: number,
  totalSlides: number,
  dotCount: number
): number {
  if (totalSlides <= 1 || dotCount <= 1) {
    return 0;
  }

  return Math.round(
    (dotIndex * (totalSlides - 1)) / (dotCount - 1)
  );
}

function getActiveDotIndex(
  activeSlideIndex: number,
  totalSlides: number,
  dotCount: number
): number {
  if (totalSlides <= 1 || dotCount <= 1) {
    return 0;
  }

  return Math.round(
    (activeSlideIndex * (dotCount - 1)) / (totalSlides - 1)
  );
}

export default function VimeoSlider({
  videos,
  activeSlide,
  setActiveSlide,
  dark = false,
}: VimeoSliderProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
  const totalSlides = videos.length;

  const dotCount = getDotCount(totalSlides);

  const activeDot = getActiveDotIndex(
    activeSlide,
    totalSlides,
    dotCount
  );

  const showPrevious = () => {
    setActiveSlide(
      (current) =>
        (current - 1 + totalSlides) % totalSlides
    );
  };

  const showNext = () => {
    setActiveSlide(
      (current) => (current + 1) % totalSlides
    );
  };

  const currentVideo = videos[activeSlide];

  useEffect(() => {
    const player = playerRef.current;
    if (!player || shouldLoadPlayer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadPlayer(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(player);
    return () => observer.disconnect();
  }, [shouldLoadPlayer]);

  if (!currentVideo) {
    return null;
  }

  return (
  <div className="mx-auto w-full max-w-[1300px]">
    {/* Video */}
    <div
      className={`relative overflow-hidden rounded-2xl border ${
        dark
          ? "border-white/30 bg-[#03122B]/20"
          : "border-[#E0E3E8] bg-[#03122B]/5"
      }`}
    >
      <div ref={playerRef} className="aspect-video w-full">
        {shouldLoadPlayer ? (
          <iframe
            key={currentVideo.url}
            src={`${currentVideo.url}?autoplay=0&title=0&byline=0&portrait=0`}
            title={currentVideo.title}
            className="h-full w-full"
            loading="lazy"
            allow="fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : null}
      </div>

      {/* Previous */}
      <button
        type="button"
        aria-label="Previous video"
        onClick={showPrevious}
        className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#082F72] shadow transition hover:bg-white"
      >
        ‹
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next video"
        onClick={showNext}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#082F72] shadow transition hover:bg-white"
      >
        ›
      </button>
    </div>

    {/* Dots */}
    <div className="mt-3 flex items-center justify-center gap-2">
      {/* dots */}
    </div>
  </div>
);
}
