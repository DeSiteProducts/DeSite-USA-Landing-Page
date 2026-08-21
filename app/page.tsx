"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import VimeoSlider from "./models/_components/VimeoSlider";
import ShippingQuoteButton from "./models/_components/ShippingQuoteButton";
import ShippingQuoteSection from "./models/_components/ShippingQuoteSection";
import MachineModelModal from "./models/_components/modalProductPage";

const sliderVideos108 = [
  {
    title: "108 Pro Screen Overview",
    url: "https://player.vimeo.com/video/1129297305?h=3358993330",
  },
  {
    title: "108 Pro Screen Screening High Moisture",
    url: "https://player.vimeo.com/video/1129547638?h=a66ca9db31",
  },
  {
    title: "108 Pro Screen Screening Heavy Stone",
    url: "https://player.vimeo.com/video/1040497959?h=b6f93c5eba",
  },
  {
    title: "108 Pro Screen Screening Heavy Rock",
    url: "https://player.vimeo.com/video/1092573792?h=25ce758707",
  },
  {
    title: "108 Pro Screen With Kawasaki Loader",
    url: "https://player.vimeo.com/video/1129566655?h=307210bee9",
  },
  {
    title: "108 Pro Screen With Bucket Transport Lugs",
    url: "https://player.vimeo.com/video/1128089884?h=f0189d38fc",
  },
  {
    title: "108 Pro Screen | Vibratory Packs",
    url: "https://player.vimeo.com/video/1043689493?h=b80904544e",
  },
  {
    title: "108 Pro Screen | Cantilevered Suspension System",
    url: "https://player.vimeo.com/video/1128101400?h=f6c6db216b",
  },
  {
    title: "108 Pro Screen | Tilting Screen Deck",
    url: "https://player.vimeo.com/video/1128098242?h=0e8a32956d",
  },
  {
    title: "108 Pro Screen | Feed Deflector System",
    url: "https://player.vimeo.com/video/1043680333?h=7f9fc08e96",
  },
  {
    title: "108 PORTABILITY",
    url: "https://player.vimeo.com/video/1040503019?h=7f9fc08e96",
  },
  {
    title: "108 Tilting Screen Deck",
    url: "https://player.vimeo.com/video/892022172?h=7f9fc08e96",
  },
  {
    title: "DeSite SLG 108 Caterpillar 325DLC",
    url: "https://player.vimeo.com/video/1127634741?h=7f9fc08e96",
  },
  {
    title: "DeSite SLG 108 seperating fines from rock",
    url: "https://player.vimeo.com/video/1127635005?h=7f9fc08e96",
  }

];

const sliderVideos78 = [
  {
    title: "78 Pro Screen Overview",
    url: "https://player.vimeo.com/video/1040490358?h=c7cecd2c3c",
  },
  {
    title: "78 Pro Screen Screening Asphalt Millings",
    url: "https://player.vimeo.com/video/1123234935?h=8c70eb67cd",
  },
  {
    title: "78 Pro Screen With Flow Control Wings",
    url: "https://player.vimeo.com/video/1040493255?h=8b6c9264b5",
  },
  {
    title: "78 Pro Screen Screening Pea Gravel, Road Base and Bedding Sand",
    url: "https://player.vimeo.com/video/1129581983?h=c378feb2db",
  },
  {
    title: "78 Pro Screen | Full Demo",
    url: "https://player.vimeo.com/video/1111673557?h=43ff7e2da1",
  },
  {
    title: "78 Pro Screen Testimonial",
    url: "https://player.vimeo.com/video/1129574249?h=c0ee34d8a2",
  },
  {
    title: "78 Pro Screen | Bucket Transport Lugs",
    url: "https://player.vimeo.com/video/1002010673?h=fb437d6aa0",
  },
  {
    title: "78 Pro Screen | Quick Disconnect Riser Box",
    url: "https://player.vimeo.com/video/1002053883?h=9e54c8ba04",
  },
  {
    title: "78 Pro Screen | Cantilevered Suspension System",
    url: "https://player.vimeo.com/video/1002920458?h=8c306d1620",
  },
  {
    title: "78 Pro Screen | Feeder Deflection System + Flow Control Wings",
    url: "https://player.vimeo.com/video/1002055466?h=7a2dc39d03",
  },
];

const sliderVideos68 = [

  {
    title: "68 Pro Screen Full Overview",
    url: "https://player.vimeo.com/video/1079537676?h=21b032376a",
  },
  {
    title: "68 Pro Screen Overview",
    url: "https://player.vimeo.com/video/1129558957?h=2e45ba4add",
  },
  {
    title: "68 Pro Screen Testimonial",
    url: "https://player.vimeo.com/video/1118787608?h=28d1d5af5a",
  },
  {
    title: "68 Pro Screen | Tilting Screen Deck",
    url: "https://player.vimeo.com/video/1005869460?h=4bb0f108e5",
  },
  {
    title: "68 Pro Screen | Vibratory Pack",
    url: "https://player.vimeo.com/video/1005864709?h=0cfa6b61fd",
  },
  {
    title: "68 Pro Screen | Cantilevered Suspension System",
    url: "https://player.vimeo.com/video/1005876656?h=d21aacc03c",
  },
  {
    title: "68 Pro Screen Overview",
    url: "https://player.vimeo.com/video/1040504352?h=d21aacc03c",
  },
  {
    title: "68 Hompage",
    url: "https://player.vimeo.com/video/892414970?h=d21aacc03c",
  },
  {
    title: "68 Pro Screen Testimonial",
    url: "https://player.vimeo.com/video/1118787608?h=d21aacc03c",
  },
];

const sliderVideosSlg108 = [
  {
    title: "SLG 108 Overview",
    url: "https://player.vimeo.com/video/1130931600?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 In Action",
    url: "https://player.vimeo.com/video/1130937806?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 Product Demo",
    url: "https://player.vimeo.com/video/1154326645?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 Spring Loaded Grizzly | Cantilevered Suspension System",
    url: "https://player.vimeo.com/video/1123901262?share=copy&fl=sv&fe=ci",
  },
];

const sliderVideosSlg78 = [
  {
    title: "SLG 78 Overview",
    url: "https://player.vimeo.com/video/1090497018?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 In Action",
    url: "https://player.vimeo.com/video/1001990400?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Product Demo",
    url: "https://player.vimeo.com/video/1129293428?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Spring Loaded Grizzly Screening Overview",
    url: "https://player.vimeo.com/video/1003281077?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Spring Loaded Grizzly Screening Dirt",
    url: "https://player.vimeo.com/video/1129896297?share=copy&fl=sv&fe=ci",
  },
  {
    title: "78 GRIZZLY",
    url: "https://player.vimeo.com/video/1123779281?share=copy&fl=sv&fe=ci",
  },
];

const sliderVideosSlg56 = [
  {
    title: "SLG 56 Overview",
    url: "https://player.vimeo.com/video/1125998905?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 In Action",
    url: "https://player.vimeo.com/video/970371995?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Product Demo",
    url: "https://player.vimeo.com/video/1006286529?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Screening Demo",
    url: "https://player.vimeo.com/video/970809028?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Towable Spring Loaded Grizzly | Mesh System",
    url: "https://player.vimeo.com/video/967214871?share=copy&fl=sv&fe=ci",
  }
];



export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide78, setActiveSlide78] = useState(0);
  const [activeSlide68, setActiveSlide68] = useState(0);
  const [activeSlideSlg108, setActiveSlideSlg108] = useState(0);
  const [activeSlideSlg78, setActiveSlideSlg78] = useState(0);
  const [activeSlideSlg56, setActiveSlideSlg56] = useState(0);
  const [currency, setCurrency] = useState<"USD" | "CAD">("USD");
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);
  const [selectedMachineModel, setSelectedMachineModel] = useState("");

  const openMachineModal = (model: string) => {
    setSelectedMachineModel(model);
    setIsMachineModalOpen(true);
  };
  const closeMachineModal = () => {
    setIsMachineModalOpen(false);
    setSelectedMachineModel("");
  };

  useEffect(() => {
    const detectCurrencyByCountry = async () => {
      try {
        const response = await fetch("/api/geo", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as { countryCode?: string | null };
        const countryCode = (data.countryCode || "").toUpperCase();

        setCurrency(countryCode === "CA" ? "CAD" : "USD");
      } catch {
        setCurrency("USD");
      }
    };

    void detectCurrencyByCountry();
  }, []);



  const trackCallClick = () => {
    const payload = {
      event: "phone_call_click",
      phone_number: "+18772547903",
      cta_location: "footer_contact_section",
    };

    (window as { dataLayer?: Array<Record<string, string>> }).dataLayer?.push(
      payload
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] px-6 py-12 text-white md:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="rounded-3xl border border-white/15 bg-white/8 p-8 backdrop-blur-sm md:p-12">
          <Image
            src="/LOGO.webp"
            alt="DeSite Products logo"
            width={380}
            height={140}
            className="h-auto w-56 md:w-80 mx-auto"
            priority
          />
          <h1 className="mt-3 text-[clamp(0.95rem,4.2vw,3.75rem)] font-extrabold leading-tight">
            <span className="block whitespace-nowrap text-center">VIBRATORY SCREENERS</span>

          </h1>
        </div>

        <section id="modelos" className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-white/15 bg-white p-6 text-[#03122B] shadow-xl shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2674F0]">
              Portable Vibratory Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">108 ProScreen</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideos108}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#082F72]">
                DESIGNED FOR FULL SIZED EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-[#082F72] md:text-4xl">
                {currency === "CAD" ? "$19,900 USD" : "$19,900 USD"}
              </p>
            </div>

            <ShippingQuoteButton model="108 ProScreen" />
            <button
              type="button"
              onClick={() => openMachineModal("108 ProScreen")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>

          <article className="rounded-3xl border border-[#2674F0] bg-gradient-to-b from-[#2674F0] to-[#082F72] p-6 text-white shadow-xl shadow-[#03122B]/40">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E0E3E8]">
              Portable Vibratory Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">78 ProScreen</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideos78}
                activeSlide={activeSlide78}
                setActiveSlide={setActiveSlide78}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#E0E3E8]">
                DESIGNED FOR MID SIZE EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {currency === "CAD" ? "$13,900 USD" : "$13,900 USD"}
              </p>
            </div>
            <ShippingQuoteButton model="78 ProScreen" />

            <button
              type="button"
              onClick={() => openMachineModal("78 ProScreen")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white p-6 text-[#03122B] shadow-xl shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2674F0]">
              Portable Vibratory Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">68 ProScreen</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideos68}
                activeSlide={activeSlide68}
                setActiveSlide={setActiveSlide68}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#082F72]">
                DESIGNED FOR MINI SIZED EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-[#082F72] md:text-4xl">
                {currency === "CAD" ? "$7,900 USD" : "$7,900 USD"}
              </p>
            </div>
            <ShippingQuoteButton model="68 ProScreen" />
            <button
              type="button"
              onClick={() => openMachineModal("68 ProScreen")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>


        </section>
        <div className="rounded-3xl border border-white/15 bg-white/8 p-8 backdrop-blur-sm md:p-12">

          <h1 className="mt-3 text-[clamp(0.95rem,4.2vw,3.75rem)] font-extrabold leading-tight">
            <span className="block whitespace-nowrap text-center">SPRING GRIZZLY SCREENERS</span>

          </h1>
        </div>
        <section id="modelos" className="grid grid-cols-1 gap-6 md:grid-cols-3">


          <article className="rounded-3xl border border-white/15 bg-white p-6 text-[#03122B] shadow-xl shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2674F0]">
              Grizzly Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">SLG 108</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideosSlg108}
                activeSlide={activeSlideSlg108}
                setActiveSlide={setActiveSlideSlg108}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#082F72]">
                DESIGNED FOR FULL SIZED EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-[#082F72] md:text-4xl">
                {currency === "CAD" ? "$14,900 USD" : "$14,900 USD"}
              </p>
            </div>
            <ShippingQuoteButton model="SLG 108" />
            <button
              type="button"
              onClick={() => openMachineModal("SLG 108")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>

          <article className="rounded-3xl border border-[#2674F0] bg-gradient-to-b from-[#2674F0] to-[#082F72] p-6 text-white shadow-xl shadow-[#03122B]/40">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E0E3E8]">
              Grizzly Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">SLG 78</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideosSlg78}
                activeSlide={activeSlideSlg78}
                setActiveSlide={setActiveSlideSlg78}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#E0E3E8]">
                DESIGNED FOR MID SIZE EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {currency === "CAD" ? "$7,900 USD" : "$7,900 USD"}
              </p>
            </div>
            <ShippingQuoteButton model="SLG 78" />
            <button
              type="button"
              onClick={() => openMachineModal("SLG 78")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white p-6 text-[#03122B] shadow-xl shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2674F0]">
              Portable Screener
            </p>
            <h2 className="mt-3 text-2xl font-bold">SLG 56</h2>
            <div className="mt-5">
              <VimeoSlider
                videos={sliderVideosSlg56}
                activeSlide={activeSlideSlg56}
                setActiveSlide={setActiveSlideSlg56}
              />

              <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#082F72]">
                DESIGNED FOR COMPACT EQUIPMENT
              </p>

              <p className="mt-3 text-center text-3xl font-extrabold tracking-tight text-[#082F72] md:text-4xl">
                {currency === "CAD" ? "$4,500 USD" : "$4,500 USD"}
              </p>
            </div>
            <ShippingQuoteButton model="SLG 56" />
            <button
              type="button"
              onClick={() => openMachineModal("SLG 56")}
              className="mt-3 mx-auto flex w-fit items-center gap-2 rounded-full bg-[#E0E3E8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#082F72] transition hover:bg-[#C9D1DC]"
            >
              <span aria-hidden="true">→</span>
              WATCH IN ACTION
            </button>
          </article>
        </section>
        <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6">
          <h2 className="text-center text-xl font-extrabold uppercase tracking-wide md:text-3xl">
            ABOUT MESH
          </h2>

          {/* SQUARE */}
          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#2674F0] md:grid-cols-2">

            {/* IMAGE */}
            <div className="flex items-center justify-center bg-[#0B234A] p-6">
              <Image
                src="/shared/square.webp"
                alt="Square mesh"
                width={500}
                height={500}
                className="h-auto max-h-[350px] w-full object-contain"
              />
            </div>

            {/* TABLE */}
            <div>
              <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
                SQUARE
              </h3>

              <table className="w-full text-center text-sm text-white md:text-base">
                <thead className="bg-[#1B4FA8] text-white">
                  <tr>
                    <th className="px-3 py-3 font-bold">Mesh Size</th>

                  </tr>
                </thead>

                <tbody>
                  {[
                    ['5/32" x 5/32"'],
                    ['1/4" x 1/4"'],
                    ['3/8" x 3/8"'],
                    ['1/2" x 1/2"'],
                    ['1" x 1"'],
                    ['2" x 2"'],
                    ['3" x 3"'],
                    ['4" x 4"'],
                  ].map((row, index) => (
                    <tr
                      key={`square-${row[0]}`}
                      className={
                        index % 2 === 0 ? "bg-[#102B59]" : "bg-[#0B234A]"
                      }
                    >
                      <td className="px-3 py-2.5">{row[0]}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ELONGATED */}
          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#2674F0] md:grid-cols-2">

            {/* IMAGE */}
            <div className="flex items-center justify-center bg-[#0B234A] p-6">
              <Image
                src="/shared/enlongated.webp"
                alt="Elongated mesh"
                width={500}
                height={500}
                className="h-auto max-h-[350px] w-full object-contain"
              />
            </div>

            {/* TABLE */}
            <div>
              <h3 className="bg-[#2674F0] px-4 py-3 text-center text-2xl font-extrabold uppercase tracking-wide text-white">
                ELONGATED
              </h3>

              <table className="w-full text-center text-sm text-white md:text-base">
                <thead className="bg-[#1B4FA8] text-white">
                  <tr>
                    <th className="px-3 py-3 font-bold">Mesh Size</th>
                    
                  </tr>
                </thead>

                <tbody>
                  {[
                    ['3/8" x 4"'],
                    ['1/2" x 4"'],
                    ['3/4" x 4"'],
                    ['1" x 4"'],
                  ].map((row, index) => (
                    <tr
                      key={`elongated-${row[0]}`}
                      className={
                        index % 2 === 0 ? "bg-[#102B59]" : "bg-[#0B234A]"
                      }
                    >
                      <td className="px-3 py-2.5">{row[0]}</td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <Suspense fallback={null}>
          <ShippingQuoteSection />
        </Suspense>

        <section
          id="contacto"
          className="rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold md:text-3xl">
            Ready to get your Topsoil Screener?
          </h3>
          <p className="mt-3 text-[#E0E3E8]">
            Call us now for shipping quotes and current availability.
          </p>
          <a
            id="call-now-button"
            href="tel:+18772547903"
            onClick={trackCallClick}
            className="mt-6 inline-flex rounded-full bg-[#2674F0] px-7 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-[#5693F3]"
          >
            CALL 1 (877) 254-7903
          </a>
        </section>
      </section>
      <MachineModelModal
        isOpen={isMachineModalOpen}
        onClose={closeMachineModal}
        model={selectedMachineModel}
      />
    </main>
  );
}
