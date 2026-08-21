"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const images = [
  {
    src: "/68/68.webp",
    alt: "68 ProScreen",
  },
 {
    src: "/68/68ProScreenfront2.webp",
    alt: "68 ProScreen front view",
  },
  {
    src: "/68/68ProScreenSide.webp",
    alt: "68 ProScreen side view",
  },
  {
    src: "/68/68ProScreenBack.webp",
    alt: "68 ProScreen back view",
  },
  {
    src: "/68/68ProScreeninaction1.webp",
    alt: "68 ProScreen in action",
  },
  {
    src: "/68/68ProScreeninaction2.webp",
    alt: "68 ProScreen in action",
  },
  {
    src: "/68/68ProScreeninaction3.webp",
    alt: "68 ProScreen in action",
  },
  {
    src: "/68/68ProScreeninaction4.webp",
    alt: "68 ProScreen in action",
  },
  {
    src: "/68/68ProScreeninaction5.webp",
    alt: "68 ProScreen in action",
  },

];

const equipmentIcons68 = [
  { src: "/68/icons/Miniexcavators68.webp", label: "MINI EXCAVATOR" },
  { src: "/68/icons/MiniSkidsteers68.webp", label: "MINI SKID STEER" },
  { src: "/68/icons/SubCompacttractors68.webp", label: "SUB-COMPACT TRACTOR" },
];

const machineSpecs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "89 inches" },
      { label: "Machine Height", value: "74 inches" },
      { label: "Machine Depth", value: "48 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "68 inches" },
      { label: "Screen Deck Length", value: "52 inches" },
      { label: "Screen Deck Surface area", value: "27 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "VIBRATORY SYSTEM",
    rows: [
      { label: "Vibratory Style System", value: "Dual Eccentric Armature" },
      { label: "Eccentric Rotation Speed", value: "3600 rpm" },
      {
        label: "Amperage Draw",
        value:
          "10 each on start up with 5 Amps Amp draw per motor at 3600rpm",
      },
      { label: "Eccentric Force rotation", value: "760 lbs per/revolution" },
    ],
  },
  {
    title: "ELECTRICAL POWER SUPPLY",
    rows: [
      { label: "North America", value: "110 Volt ( 60 Hertz )" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [{ label: "Total Weight", value: "1500 lbs" }],
  },
];

export default function Model68Page() {
  const router = useRouter();
  const [activeEquipment, setActiveEquipment] = useState(0);
  const [activeImageGroup, setActiveImageGroup] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const imagesPerSlide = isMobile ? 1 : 4;

  const totalImageGroups = Math.ceil(images.length / imagesPerSlide);

  const visibleImages = images.slice(
    activeImageGroup * imagesPerSlide,
    activeImageGroup * imagesPerSlide + imagesPerSlide
  );

  const goToPreviousImages = () => {
    setActiveImageGroup(
      (current) =>
        (current - 1 + totalImageGroups) % totalImageGroups
    );
  };

  const goToNextImages = () => {
    setActiveImageGroup(
      (current) => (current + 1) % totalImageGroups
    );
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEquipment((current) => (current + 2) % equipmentIcons68.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] px-6 py-12 text-white md:px-12">
      <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#082F72] transition hover:bg-white"
        >
          ← Back
        </button>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
          68 ProScreen
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#E0E3E8] md:text-base">
          Design For Buckets Up To 66 inches
        </p>

        <div className="mx-auto mt-8 w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {visibleImages.map((image, index) => {
              const realIndex =
                activeImageGroup * imagesPerSlide + index;

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(realIndex)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/25 bg-black"
                  aria-label={`Open ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                    <span className="rounded-full bg-black/60 px-4 py-2 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">
                      🔍 Zoom
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goToPreviousImages}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-[#082F72] transition hover:scale-105 hover:bg-white"
              aria-label="Previous images"
            >
              &lt;
            </button>

            <p className="min-w-16 text-center text-sm font-semibold text-[#E0E3E8]">
              {activeImageGroup + 1} / {totalImageGroups}
            </p>

            <button
              type="button"
              onClick={goToNextImages}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2674F0] text-2xl font-bold text-white transition hover:scale-105 hover:bg-[#5693F3]"
              aria-label="Next images"
            >
              &gt;
            </button>
          </div>
        </div>

        <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            DESIGNED FOR COMPACT EQUIPMENT
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[0, 1].map((offset) => {
              const item =
                equipmentIcons68[(activeEquipment + offset) % equipmentIcons68.length];
              return (
                <div
                  key={`${item.label}-${offset}`}
                  className="overflow-hidden rounded-xl border border-white/20 bg-transparent text-center py-3"
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
            {[
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
            ].map((material) => (
              <div
                key={material}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {material}
              </div>
            ))}
          </div>
        </section>



        <section className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            MACHINE SPECIFICATIONS
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {machineSpecs.map((section) => (
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
            <div className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2674F0]/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 3l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-extrabold uppercase tracking-wide text-white">
                5 Year Structural Warranty
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-gradient-to-b from-white/12 to-white/5 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2674F0]/30">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </div>
              <p className="mt-3 text-lg font-extrabold uppercase tracking-wide text-white">
                1 Year Electrical Warranty
              </p>
            </div>
          </div>
        </section>

        
      </section>
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-black transition hover:scale-105"
            aria-label="Close image"
          >
            ×
          </button>

          <div className="relative h-full w-full max-w-6xl">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
