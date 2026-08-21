import ModelDetailPage from "../_components/model-detail-page";

const images = [
  
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

];

const equipmentIcons = [
  { src: "/108/icons/backhoes.webp", label: "BACKHOE" },
  { src: "/108/icons/wheelloader.webp", label: "WHEEL LOADER" },
  { src: "/108/icons/compactexcavators.webp", label: "COMPACT EXCAVATOR" },
  { src: "/108/icons/skidsteers.webp", label: "SKID STEER" },
  { src: "/108/icons/compactwheelloaders.webp", label: "COMPACT WHEEL LOADER" },
  { src: "/108/icons/excavators108.webp", label: "EXCAVATOR" },
];

const specs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "126 inches" },
      { label: "Machine Height", value: "122 inches" },
      { label: "Machine Depth", value: "72 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "120 inches" },
      { label: "Screen Deck Length", value: "72 inches" },
      { label: "Screen Deck Surface area", value: "58 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [
      { label: "Total Weight with riser box", value: "5500 lbs" },
      { label: "Total Weight without riser box", value: "4300 lbs" },
    ],
  },
];

export default function Slg108Page() {
  return (
    <ModelDetailPage
      title="SLG 108"
      subtitle="Designed for full sized equipment"
      quoteModel="SLG 108"
      images={images}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR FULL SIZED EQUIPMENT"
      specs={specs}
     
    />
  );
}
