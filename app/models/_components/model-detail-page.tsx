"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Video = {
  title: string;
  embedUrl: string;
  description?: string;
};

type EquipmentIcon = {
  src: string;
  label: string;
};

type GalleryImage = {
  src: string;
  alt: string;
};

type SpecSection = {
  title: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

type WarrantyCard = {
  title: string;
  icon: "shield" | "bolt";
};

type ModelDetailPageProps = {
  title: string;
  subtitle: string;
  description?: string;
  quoteModel: string;
  videos: Video[];
  featureVideos: Video[];
  equipmentIcons: EquipmentIcon[];
  designedFor: string;
  specs: SpecSection[];
  galleryImages?: GalleryImage[];
  warrantyCards?: WarrantyCard[];
  showFeatures?: boolean;
};

const materials = [
  "Sand",
  "Topsoil",
  "Compost",
  "Wood Mulch",
  "Pea Stone",
  "Septic Rock",
  "Road Gravel",
  "Landscape Stone",
  "Ground Asphalt",
  "Crushed Concrete",
  "Erosion Control Rock",
  "Traction Sand",
];

const meshRows = {
  square: [
    ['5/32" x 5/32"', "Square", '1/16"'],
    ['1/4" x 1/4"', "Square", '1/8"'],
    ['3/8" x 3/8"', "Square", '1/4"'],
    ['1/2" x 1/2"', "Square", '3/8"'],
    ['1" x 1"', "Square", '3/4"'],
    ['2" x 2"', "Square", '1-1/2"'],
    ['3" x 3"', "Square", '2"'],
    ['4" x 4"', "Square", '3"'],
  ],
  elongated: [
    ['3/8" x 4"', "Elongated", '1/4" to 5/16"'],
    ['1/2" x 4"', "Elongated", '3/8" to 7/16"'],
    ['3/4" x 4"', "Elongated", '1/2" to 9/16"'],
    ['1" x 4"', "Elongated", '3/4" to 7/8"'],
  ],
};

function appendPlayerParams(embedUrl: string) {
  const separator = embedUrl.includes("?") ? "&" : "?";
  return `${embedUrl}${separator}title=0&byline=0&portrait=0`;
}

function MeshTable({
  title,
  rows,
}: {
  title: string;
  rows: string[][];
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#2674F0]">
      <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
        {title}
      </h3>
      <table className="w-full text-center text-base text-white">
        <thead className="bg-[#1B4FA8] text-white">
          <tr>
            <th className="px-4 py-3 text-center font-bold">Mesh Size</th>
            <th className="px-4 py-3 text-center font-bold">Pattern</th>
            <th className="px-4 py-3 text-center font-bold">Product Size</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={`${title}-${row[0]}`}
              className={index % 2 === 0 ? "bg-[#102B59]" : "bg-[#0B234A]"}
            >
              <td className="px-4 py-3 text-center">{row[0]}</td>
              <td className="px-4 py-3 text-center">{row[1]}</td>
              <td className="px-4 py-3 text-center">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ModelDetailPage({
  title,
  subtitle,
  description,
  quoteModel,
  videos,
  featureVideos,
  equipmentIcons,
  designedFor,
  specs,
  galleryImages = [],
  warrantyCards = [
    { title: "5 Year Structural Warranty", icon: "shield" },
    { title: "1 Year Electrical Warranty", icon: "bolt" },
  ],
  showFeatures = true,
}: ModelDetailPageProps) {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [activeFeatureVideo, setActiveFeatureVideo] = useState(0);
  const [activeEquipment, setActiveEquipment] = useState(0);

  const iframeSrc = useMemo(
    () => appendPlayerParams(videos[activeVideo].embedUrl),
    [activeVideo, videos]
  );
  const featureIframeSrc = useMemo(
    () => appendPlayerParams(featureVideos[activeFeatureVideo].embedUrl),
    [activeFeatureVideo, featureVideos]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEquipment((current) => (current + 2) % equipmentIcons.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [equipmentIcons.length]);

  useEffect(() => {
    if (galleryImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveGalleryImage((current) => (current + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [galleryImages.length]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] px-6 py-12 text-white md:px-12">
      <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-10">
        <button
          type="button"
          onClick={() => {
            window.location.href = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
          }}
          className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
        >
          ← Back
        </button>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#E0E3E8] md:text-base">
          {subtitle}
        </p>
        {description ? (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#E0E3E8] md:text-base">
            {description}
          </p>
        ) : null}

        <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/25 bg-black">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title={videos[activeVideo].title}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() =>
              setActiveVideo((current) => (current - 1 + videos.length) % videos.length)
            }
            className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
          >
            Previous
          </button>
          <p className="text-center text-sm font-semibold text-[#E0E3E8]">
            {activeVideo + 1} / {videos.length}
          </p>
          <button
            type="button"
            onClick={() => setActiveVideo((current) => (current + 1) % videos.length)}
            className="rounded-full bg-[#2674F0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5693F3]"
          >
            Next
          </button>
        </div>
        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/?model=${encodeURIComponent(
            quoteModel
          )}#shipping-quote`}
          className="mx-auto mt-5 block w-fit rounded-full bg-[#2674F0] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5693F3]"
        >
          CLICK HERE FOR A SHIPPING QUOTE
        </Link>

        {galleryImages.length > 0 ? (
          <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
            <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
              PHOTOS
            </h2>
            <div className="mx-auto mt-5 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/25 bg-[#03122B]/40">
              <div className="relative">
                <Image
                  src={galleryImages[activeGalleryImage].src}
                  alt={galleryImages[activeGalleryImage].alt}
                  width={1200}
                  height={800}
                  className="aspect-video w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={75}
                />
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() =>
                    setActiveGalleryImage(
                      (current) =>
                        (current - 1 + galleryImages.length) % galleryImages.length
                    )
                  }
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#082F72] shadow transition hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() =>
                    setActiveGalleryImage(
                      (current) => (current + 1) % galleryImages.length
                    )
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#082F72] shadow transition hover:bg-white"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`View photo ${index + 1}`}
                  onClick={() => setActiveGalleryImage(index)}
                  className={`h-2 rounded-full transition ${activeGalleryImage === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/55 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            {designedFor}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[0, 1].map((offset) => {
              const item =
                equipmentIcons[(activeEquipment + offset) % equipmentIcons.length];
              return (
                <div
                  key={`${item.label}-${offset}`}
                  className="overflow-hidden rounded-xl border border-white/20 bg-transparent py-3 text-center"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={320}
                    height={320}
                    className="mx-auto h-24 w-24 object-contain md:h-28 md:w-28"
                  />
                  <p className="px-2 py-2 text-[11px] font-bold tracking-wide text-white md:text-xs">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            YOU CAN SCREEN
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {materials.map((material) => (
              <div
                key={material}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {material}
              </div>
            ))}
          </div>
        </section>

        {showFeatures ? (
          <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
            <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
              FEATURES
            </h2>
            <p className="mt-2 text-center text-sm font-semibold tracking-wide text-[#E0E3E8]">
              {featureVideos[activeFeatureVideo].title}
            </p>
            {featureVideos[activeFeatureVideo].description ? (
              <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-[#E0E3E8]">
                {featureVideos[activeFeatureVideo].description}
              </p>
            ) : null}

            <div className="mx-auto mt-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/25 bg-black">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  key={featureIframeSrc}
                  src={featureIframeSrc}
                  title={featureVideos[activeFeatureVideo].title}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveFeatureVideo(
                    (current) =>
                      (current - 1 + featureVideos.length) % featureVideos.length
                  )
                }
                className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
              >
                Previous
              </button>
              <p className="text-center text-sm font-semibold text-[#E0E3E8]">
                {activeFeatureVideo + 1} / {featureVideos.length}
              </p>
              <button
                type="button"
                onClick={() =>
                  setActiveFeatureVideo((current) => (current + 1) % featureVideos.length)
                }
                className="rounded-full bg-[#2674F0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5693F3]"
              >
                Next
              </button>
            </div>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/?model=${encodeURIComponent(
                quoteModel
              )}#shipping-quote`}
              className="mx-auto mt-5 block w-fit rounded-full bg-[#2674F0] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5693F3]"
            >
              CLICK HERE FOR A SHIPPING QUOTE
            </Link>
          </section>
        ) : null}

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            MACHINE SPECIFICATIONS
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {specs.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-4"
              >
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#AFC2DC]">
                  {section.title}
                </h3>
                <div className="mt-3 space-y-2">
                  {section.rows.map((row) => (
                    <div
                      key={`${section.title}-${row.label}`}
                      className="rounded-lg border border-white/15 bg-[#03122B]/40 px-3 py-2"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#AFC2DC]">
                        {row.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {warrantyCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-5 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2674F0]/30">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    {card.icon === "shield" ? (
                      <path d="M12 3l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                    ) : (
                      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                    )}
                  </svg>
                </div>
                <p className="mt-3 text-lg font-extrabold uppercase tracking-wide text-white">
                  {card.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-wide md:text-3xl">
            MESH AVAILABLE
          </h2>
          <MeshTable title="SQUARE" rows={meshRows.square} />
          <MeshTable title="ELONGATED" rows={meshRows.elongated} />
        </section>
      </section>
    </main>
  );
}
