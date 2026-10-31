"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { galvanizedModels } from "../galvanized-models";

const MachineModelModal = dynamic(() => import("./modalProductPage"), { ssr: false });

export default function GalvanizedGallery({ model, showButton = true }: { model: string; showButton?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const image = galvanizedModels[model].images[0];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {image ? (
        <button type="button" onClick={() => setIsOpen(true)} className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/25 bg-white" aria-label={`Open photo gallery for ${model}`}>
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 600px" className="object-contain" />
        </button>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/25 bg-white/5 p-6 text-center text-xl font-semibold">
          Photos coming soon
        </div>
      )}
      {image && showButton && <button type="button" onClick={() => setIsOpen(true)} className="mx-auto mt-4 block rounded-full bg-[#0f0] px-6 py-2.5 font-semibold text-black">PHOTO GALLERY</button>}
      <MachineModelModal isOpen={isOpen} onClose={() => setIsOpen(false)} model={model} />
    </div>
  );
}
