import ModelDetailPage from "../_components/model-detail-page";

const videos = [
  {
    title: "SLG 108 Overview",
    embedUrl: "https://player.vimeo.com/video/1130931600?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 In Action",
    embedUrl: "https://player.vimeo.com/video/1130937806?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 Product Demo",
    embedUrl: "https://player.vimeo.com/video/1154326645?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 108 Spring Loaded Grizzly | Cantilevered Suspension System",
    embedUrl: "https://player.vimeo.com/video/1123901262?share=copy&fl=sv&fe=ci",
  },
];

const featureVideos = [
  {
    title: "TILTING SCREEN DECK",
    embedUrl: "https://player.vimeo.com/video/1128098242?h=0e8a32956d",
    description:
      "Adjusts the screen deck angle to help match production to different materials and moisture levels.",
  },
  {
    title: "CANTILEVERED SPRING SUSPENSION SYSTEM",
    embedUrl: "https://player.vimeo.com/video/1128101400?h=f6c6db216b",
    description:
      "Supports efficient vibration transfer while keeping maintenance requirements low.",
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
      videos={videos}
      featureVideos={featureVideos}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR FULL SIZED EQUIPMENT"
      specs={specs}
    />
  );
}
