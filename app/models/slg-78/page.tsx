import ModelDetailPage from "../_components/model-detail-page";

const images = [
  
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

];

const equipmentIcons = [
  { src: "/78/compactwheelloaders78.webp", label: "COMPACT WHEEL LOADER" },
  { src: "/78/Miniexcavators78.webp", label: "MINI EXCAVATOR" },
  { src: "/78/MiniSkidsteers78.webp", label: "MINI SKID STEER" },
  { src: "/78/SubCompacttractors78.webp", label: "SUB-COMPACT TRACTOR" },
];

const specs = [
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
    title: "WEIGHT",
    rows: [
      { label: "Total Weight with riser box", value: "2500 lbs" },
      { label: "Total Weight without riser box", value: "2000 lbs" },
    ],
  },
];

export default function Slg78Page() {
  return (
    <ModelDetailPage
      title="SLG 78"
      subtitle="Designed for mid size equipment"
      quoteModel="SLG 78"
      images={images}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR MID SIZE EQUIPMENT"
      specs={specs}
    />
  );
}
