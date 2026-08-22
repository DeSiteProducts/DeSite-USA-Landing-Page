"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const videos = [
  {
    title: "78 Pro Screen Overview",
    embedUrl: "https://player.vimeo.com/video/1040490358?h=c7cecd2c3c",
  },
  {
    title: "78 Pro Screen Screening Asphalt Millings",
    embedUrl: "https://player.vimeo.com/video/1123234935?h=8c70eb67cd",
  },
  {
    title: "78 Pro Screen With Flow Control Wings",
    embedUrl: "https://player.vimeo.com/video/1040493255?h=8b6c9264b5",
  },
  {
    title: "78 Pro Screen Screening Pea Gravel, Road Base and Bedding Sand",
    embedUrl: "https://player.vimeo.com/video/1129581983?h=c378feb2db",
  },
  {
    title: "78 Pro Screen | Full Demo",
    embedUrl: "https://player.vimeo.com/video/1111673557?h=43ff7e2da1",
  },
  {
    title: "78 Pro Screen Testimonial",
    embedUrl: "https://player.vimeo.com/video/1129574249?h=c0ee34d8a2",
  },
  {
    title: "78 Pro Screen | Bucket Transport Lugs",
    embedUrl: "https://player.vimeo.com/video/1002010673?h=fb437d6aa0",
  },
  {
    title: "78 Pro Screen | Quick Disconnect Riser Box",
    embedUrl: "https://player.vimeo.com/video/1002053883?h=9e54c8ba04",
  },
  {
    title: "78 Pro Screen | Cantilevered Suspension System",
    embedUrl: "https://player.vimeo.com/video/1002920458?h=8c306d1620",
  },
  {
    title: "78 Pro Screen | Feeder Deflection System + Flow Control Wings",
    embedUrl: "https://player.vimeo.com/video/1002055466?h=7a2dc39d03",
  },
];
const machineSpecs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "98 inches" },
      { label: "Machine Height", value: "104 inches" },
      { label: "Machine Depth", value: "72 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "80 inches" },
      { label: "Screen Deck Length", value: "52 inches" },
      { label: "Screen Deck Surface area", value: "29 sq/ft" },
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
    rows: [
      { label: "Total Weight with riser box", value: "2500 lbs" },
      { label: "Total Weight without riser box", value: "2000 lbs" },
    ],
  },
];
const featureVideos = [
  {
    title: "FEED DEFLECTION SYSTEM + FLOW CONTROL WINGS",
    embedUrl: "https://player.vimeo.com/video/1002055466?h=7a2dc39d03",
    description:
      "The FEED DEFLECTION SYSTEM combined with FLOW CONTROL wings is designed to ensure more uniform screening of materials in process. These systems enable material to enter the screener evenly, optimizing the efficiency of the operation. The FLOW CONTROL wings, unique and exclusive to the 78 ProScreen model, play a crucial role in controlling the flow of material, allowing larger particles like stones and other objects to pass through smoothly. These wings are adjustable, accommodating different material sizes, and then returning to their original position, ensuring consistent performance.",
  },
  {
    title: "TILTING SCREEN DECK",
    embedUrl: "https://player.vimeo.com/video/1111673557?h=43ff7e2da1",
    description:
      "The TILTING SCREEN DECK is a unique and exclusive system to DeSite Screeners. We understand that depending on the moisture level of a material, it can be a real headache, as high moisture content can slow down material flow or even cause it to stick to the mesh, clogging the screener.",
  },
  {
    title: "CANTILEVERED SPRING SUSPENSION SYSTEM",
    embedUrl: "https://player.vimeo.com/video/1002920458?h=8c306d1620",
    description:
      "The Cantilevered Spring Suspension System is designed to be virtually maintenance-free, requiring attention to just two grease points per shift. This advanced system utilizes leaf springs, Z springs, and UHMW bushings to keep the suspension tubes and coils separate, eliminating the need for lubrication. With less time spent on maintenance, you can focus more on screening, leading to increased production and profitability.",
  },
  {
    title: "POWER BOX",
    embedUrl: "https://player.vimeo.com/video/1040490358?h=c7cecd2c3c",
    description:
      "The 78 ProScreen is equipped with dual eccentric vibratory packs, each motor operating at 3600 RPM and generating approximately 760 lbs of force. This powerful setup ensures efficient material screening. The starter box includes two capacitors that store energy to facilitate smooth motor startup, while at operating speed, each vibratory pack only draws about 5 amps, making the system energy-efficient.",
  }
];

const equipmentIcons78 = [
  { src: "/78/compactwheelloaders78.webp", label: "COMPACT WHEEL LOADER" },
  { src: "/78/Miniexcavators78.webp", label: "MINI EXCAVATOR" },
  { src: "/78/MiniSkidsteers78.webp", label: "MINI SKID STEER" },
  { src: "/78/SubCompacttractors78.webp", label: "SUB-COMPACT TRACTOR" },
];

export default function Model78Page() {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeFeatureVideo, setActiveFeatureVideo] = useState(0);
  const [activeEquipment, setActiveEquipment] = useState(0);

  const iframeSrc = useMemo(
    () => `${videos[activeVideo].embedUrl}&title=0&byline=0&portrait=0`,
    [activeVideo]
  );
  const featureIframeSrc = useMemo(
    () =>
      `${featureVideos[activeFeatureVideo].embedUrl}&title=0&byline=0&portrait=0`,
    [activeFeatureVideo]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEquipment((current) => (current + 2) % equipmentIcons78.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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
          78 ProScreen
        </h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#E0E3E8] md:text-base">
          Design For Buckets Up To 82 inches
        </p>

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
            "78 ProScreen"
          )}#shipping-quote`}
          className="mx-auto mt-5 block w-fit rounded-full bg-[#2674F0] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5693F3]"
        >
          CLICK HERE FOR A SHIPPING QUOTE
        </Link>

        <section className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-lg font-extrabold uppercase tracking-wide md:text-2xl">
            DESIGNED FOR MID SIZE EQUIPMENT
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[0, 1].map((offset) => {
              const item =
                equipmentIcons78[(activeEquipment + offset) % equipmentIcons78.length];
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
            FEATURES
          </h2>
          <p className="mt-2 text-center text-sm font-semibold tracking-wide text-[#E0E3E8]">
            {featureVideos[activeFeatureVideo].title}
          </p>
          {featureVideos[activeFeatureVideo].description && (
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-[#E0E3E8]">
              {featureVideos[activeFeatureVideo].description}
            </p>
          )}

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
            "78 ProScreen"
          )}#shipping-quote`}
          className="mx-auto mt-5 block w-fit rounded-full bg-[#2674F0] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5693F3]"
        >
          CLICK HERE FOR A SHIPPING QUOTE
        </Link>
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

        <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-wide md:text-3xl">
            MESH AVAILABLE
          </h2>

          <div className="mt-6 rounded-2xl border border-[#2674F0] overflow-hidden">
            <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
              SQUARE
            </h3>
            <table className="w-full text-center text-base text-white">
              <thead className="bg-[#1B4FA8] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-center">Mesh Size</th>
                  <th className="px-4 py-3 font-bold text-center">Pattern</th>
                  <th className="px-4 py-3 font-bold text-center">Product Size</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['5/32" x 5/32"', "Square", '1/16"'],
                  ['1/4" x 1/4"', "Square", '1/8"'],
                  ['3/8" x 3/8"', "Square", '1/4"'],
                  ['1/2" x 1/2"', "Square", '3/8"'],
                  ['1" x 1"', "Square", '3/4"'],
                  ['2" x 2"', "Square", '1-1/2"'],
                  ['3" x 3"', "Square", '2"'],
                  ['4" x 4"', "Square", '3"'],
                ].map((row, index) => (
                  <tr
                    key={`square-${row[0]}`}
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

          <div className="mt-6 rounded-2xl border border-[#2674F0] overflow-hidden">
            <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
              ELONGATED
            </h3>
            <table className="w-full text-center text-base text-white">
              <thead className="bg-[#1B4FA8] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-center">Mesh Size</th>
                  <th className="px-4 py-3 font-bold text-center">Pattern</th>
                  <th className="px-4 py-3 font-bold text-center">Product Size</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['3/8" x 4"', "Elongated", '1/4" to 5/16"'],
                  ['1/2" x 4"', "Elongated", '3/8" to 7/16"'],
                  ['3/4" x 4"', "Elongated", '1/2" to 9/16"'],
                  ['1" x 4"', "Elongated", '3/4" to 7/8"'],
                ].map((row, index) => (
                  <tr
                    key={`elongated-${row[0]}`}
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
        </section>
      </section>
    </main>
  );
}
