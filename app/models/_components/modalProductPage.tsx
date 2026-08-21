"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MachineImage = {
    src: string;
    alt: string;
};

type MachineModelData = {
    model: string;
    bucketSize: string;
    images: MachineImage[];
};

type MachineModelModalProps = {
    isOpen: boolean;
    onClose: () => void;
    model: string;
};

// Aquí relacionas cada modelo con sus imágenes y bucket.
const machineModels: Record<string, MachineModelData> = {
    "108 ProScreen": {
        model: "108 ProScreen",
        bucketSize: "Design For Buckets Up To 108 inches",
        images: [
            {
                src: "/108/108.webp",
                alt: "108 ProScreen",
            },
            {
                src: "/108/108ProScreenFront.webp",
                alt: "108 ProScreen front view",
            },

            {
                src: "/108/108ProScreenside2.webp",
                alt: "108 ProScreen side view",
            },
            {
                src: "/108/108ProScreenside3.webp",
                alt: "108 ProScreen side view",
            },
            {
                src: "/108/108ProScreenBack.webp",
                alt: "108 ProScreen back view",
            },
            {
                src: "/108/108InAction.png",
                alt: "108 ProScreen in action",
            },
            {
                src: "/108/108InAction4.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/108/108InAction5.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/108/108InAction6.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/108/108InAction7.webp",
                alt: "108 ProScreen in action",
            },
        ],
    },

    "78 ProScreen": {
        model: "78 ProScreen",
        bucketSize: "Design For Buckets Up To 82 inches",
        images: [
            {
                src: "/78/78.webp",
                alt: "78 ProScreen",
            },
            {
                src: "/78/78ProScreenfront.webp",
                alt: "78 ProScreen front view",
            },
            {
                src: "/78/78ProScreenfront1.webp",
                alt: "78 ProScreen front view",
            },
            {
                src: "/78/78ProScreenfront3.webp",
                alt: "78 ProScreen front view",
            },

            {
                src: "/78/78ProScreenSide.webp",
                alt: "78 ProScreen side view",
            },
            {
                src: "/78/78ProScreenback.webp",
                alt: "78 ProScreen back view",
            },

            {
                src: "/78/78ProScreenback2.webp",
                alt: "78 ProScreen back view",
            },
            {
                src: "/78/78ProScreeninaction1.webp",
                alt: "78 ProScreen in action",
            },
            {
                src: "/78/78ProScreeninaction2.webp",
                alt: "78 ProScreen in action",
            },
            {
                src: "/78/78ProScreeninaction3.webp",
                alt: "78 ProScreen in action",
            },
            {
                src: "/78/78ProScreeninaction4.webp",
                alt: "78 ProScreen in action",
            },
            {
                src: "/78/78ProScreen2.png",
                alt: "78 ProScreen in action",
            },
            {
                src: "/78/78ProScreen3.png",
                alt: "78 ProScreen front view",
            },
        ],
    },
    "68 ProScreen": {
        model: "68 ProScreen",
        bucketSize: "Design For Buckets Up To 66 inches",
        images: [
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
        ],
    },
    "SLG 108": {
        model: "SLG 108",
        bucketSize: "Design For Buckets Up To 66 inches",
        images: [
            {
                src: "/SLG-108/SLG108frontview.png",
                alt: "108 ProScreen front view",
            },

            {
                src: "/SLG-108/SLG108side.webp",
                alt: "108 ProScreen side view",
            },

            {
                src: "/SLG-108/SLG10845left.png",
                alt: "108 ProScreen side view",
            },
            {
                src: "/SLG-108/SLG10845rightview.png",
                alt: "108 ProScreen side view",
            },
            {
                src: "/SLG-108/SLG108BackView.png",
                alt: "108 ProScreen back view",
            },
            {
                src: "/SLG-108/SLG108inaction1.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/SLG-108/SLG108inaction2.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/SLG-108/SLG108inaction3.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/SLG-108/SLG108inaction4.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/SLG-108/SLG108inaction5.webp",
                alt: "108 ProScreen in action",
            },
            {
                src: "/SLG-108/SLG108inaction6.webp",
                alt: "108 ProScreen in action",
            },
        ],
    },
    "SLG 78": {
        model: "SLG 78",
        bucketSize: "Design For Buckets Up To 82 inches",
        images: [
            {
                src: "/SLG-78/SLG78front.webp",
                alt: "SLG 78 front view",
            },
            {
                src: "/SLG-78/SLG78front2.webp",
                alt: "SLG 78 front view",
            },

            {
                src: "/SLG-78/SLG78side.webp",
                alt: "SLG 78 side view",
            },

            {
                src: "/SLG-78/SLG78side2.webp",
                alt: "SLG 78 side view",
            },

            {
                src: "/SLG-78/SLG78back.webp",
                alt: "SLG 78 back view",
            },
            {
                src: "/SLG-78/SLG78inaction1.webp",
                alt: "SLG 78 in action",
            },
            {
                src: "/SLG-78/SLG78inaction2.webp",
                alt: "SLG 78 in action",
            },
            {
                src: "/SLG-78/SLG78inaction3.webp",
                alt: "SLG 78 in action",
            },
            {
                src: "/SLG-78/SLG78inaction4.webp",
                alt: "SLG 78 in action",
            },
            {
                src: "/SLG-78/SLG78inaction5.webp",
                alt: "SLG 78 in action",
            }
        ],
    },
    "SLG 56": {
        model: "SLG 56",
        bucketSize: "Design For Buckets Up To 82 inches",
        images: [
            {
                src: "/SLG-56/SLG56Front.webp",
                alt: "56 Mini front view",
            },

            {
                src: "/SLG-56/SLG56Side.webp",
                alt: "108 ProScreen side view",
            },

            {
                src: "/SLG-56/SLG56Side1.webp",
                alt: "56 Mini side view",
            },

            {
                src: "/SLG-56/SLG56Back.webp",
                alt: "56 Mini back view",
            },
            {
                src: "/SLG-56/SLG56Back1.webp",
                alt: "56 Mini back view",
            },
            {
                src: "/SLG-56/SLG56inaction1.webp",
                alt: "56 Mini in action",
            },
            {
                src: "/SLG-56/SLG56inaction2.webp",
                alt: "56 Mini in action",
            },
            {
                src: "/SLG-56/SLG56inaction3.webp",
                alt: "56 Mini in action",
            },
            {
                src: "/SLG-56/SLG56inaction4.webp",
                alt: "56 Mini in action",
            },
            {
                src: "/SLG-56/SLG56inaction5.webp",
                alt: "56 Mini in action",
            },

        ],
    },
};

export default function MachineModelModal({
    isOpen,
    onClose,
    model,
}: MachineModelModalProps) {
    const [activeImageGroup, setActiveImageGroup] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const machine = machineModels[model];

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

    // Cerrar con Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (selectedImage !== null) {
                    setSelectedImage(null);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, selectedImage, onClose]);

    if (!isOpen) return null;

    if (!machine) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                role="dialog"
                aria-modal="true"
            >
                <div className="w-full max-w-lg rounded-2xl bg-[#03122B] p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-[#AFC2DC]">
                                Screener Model
                            </p>

                            <h2 className="mt-1 text-2xl font-bold">
                                {model}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-black"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    const imagesPerSlide = isMobile ? 1 : 4;

    const totalImageGroups = Math.ceil(
        machine.images.length / imagesPerSlide
    );

    const visibleImages = machine.images.slice(
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

    return (
        <>
            {/* MODAL */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
                role="dialog"
                aria-modal="true"
                aria-label={`Machine model ${machine.model}`}
                onClick={onClose}
            >
                <div
                    className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/20 bg-gradient-to-b from-[#03122B] via-[#073073] to-[#082F72] p-5 text-white shadow-2xl md:p-8"
                    onClick={(event) => event.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-bold text-black transition hover:scale-105"
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                    {/* HEADER */}
                    <div className="pr-14">
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#AFC2DC]">
                            Machine Model
                        </p>

                        <h2 className="mt-1 text-3xl font-extrabold tracking-tight md:text-5xl">
                            {machine.model}
                        </h2>
                    </div>

                    {/* IMAGE GALLERY */}
                    <div className="mx-auto mt-8 w-full">
                        <div
                            className={`grid grid-cols-1 gap-4 ${!isMobile ? "md:grid-cols-4" : ""
                                }`}
                        >
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
                                            quality={65}
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

                        {/* ARROWS */}
                        {machine.images.length > imagesPerSlide && (
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
                        )}
                    </div>

                 
                </div>
            </div>

            {/* FULLSCREEN IMAGE */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-black transition hover:scale-105"
                        aria-label="Close image"
                    >
                        ×
                    </button>

                    <div
                        className="relative h-full w-full max-w-6xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Image
                            src={machine.images[selectedImage].src}
                            alt={machine.images[selectedImage].alt}
                            fill
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            quality={65}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
