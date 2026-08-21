import ModelDetailPage from "../_components/model-detail-page";

const images = [
  
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

];

const equipmentIcons = [
  { src: "/68/icons/Miniexcavators68.webp", label: "MINI EXCAVATOR" },
  { src: "/68/icons/MiniSkidsteers68.webp", label: "STAND ON SKID STEER" },
  { src: "/68/icons/SubCompacttractors68.webp", label: "MINI TRACTOR" },
];

const specs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "74 inches" },
      { label: "Machine Height", value: "61.4 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "63 inches" },
      { label: "Screen Deck Length", value: "66 inches" },
      { label: "Screen Deck Surface area", value: "33 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [
      { label: "Total Weight", value: "991 lbs" },
    ],
  },
];

export default function Slg56Page() {
  return (
    <ModelDetailPage
      title="SLG 56 Mini"
      subtitle="Hourly Production 5 to 10 yards per hour"
      description="The SLG 56 Mini is designed specifically for mini equipment, making it an ideal fit for small-scale screening projects and operations."
      quoteModel="SLG 56"
      images={images}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR MINI SIZED EQUIPMENT"
      specs={specs}
      warrantyCards={[{ title: "5 Year Structural Warranty", icon: "shield" }]}
      showFeatures={false}
    />
  );
}
